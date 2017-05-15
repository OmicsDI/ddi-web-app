import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Profile} from "../../../model/Profile";
import {DataSetShort} from "../../../model/DataSetShort";
import {DataSetService} from "../../../services/dataset.service";
import {DataSetDetail} from "../../../model/DataSetDetail";
import {AppConfig} from "../../../app.config";
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  profileX : Profile = new Profile;
  public name: String;
  form: FormGroup;
  editMode: boolean = false;
  facebookConnected: boolean = false;
  orcidConnected: boolean = false;
  dataSetDetails:DataSetDetail[] = new Array<DataSetDetail>();
  profileImageUrl: string = "";
  coauthors: string[];
  userId: string = "";

  public uploader:FileUploader;

  constructor(private profileService: ProfileService
    ,private dataSetService: DataSetService
    ,private formBuilder: FormBuilder
    ,private appConfig: AppConfig) {
    this.form = formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required
      ]],
      phone: [],
      address: formBuilder.group({
        street: ['', Validators.minLength(3)],
        suite: [],
        city: ['', Validators.maxLength(30)],
        zipcode: ['', Validators.pattern('^([0-9]){5}([-])([0-9]){4}$')]
      })
    });
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(
        x => {
          this.profileImageUrl = this.getProfileImageUrl();
          this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.profileService.profile.userId)});
          this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.profileImageUrl = this.getProfileImageUrl();
          };
        }
    );
  }

  /*
  getProfile(){
    this.profileService.getProfile()
      .subscribe(
        profile => {
          console.log('getting profile')
          this.profileX = profile;
          this.name = profile.userName;

          this.dataSetDetails = [];

          profile.dataSets.forEach( x => this.dataSetService.getDataSetDetail_private(x.dataSetId, x.source).subscribe(
            y => {
              let d:DataSetDetail = y ;

              y['claimed'] = x.claimed;
              y['databaseUrl'] = this.appConfig.database_urls[this.appConfig.repositories[x.source]];

              this.dataSetDetails.push(y)
            })
          );

          this.userId =  profile.userId
          this.getConnections(this.userId);
          this.getCoAuthors(this.userId);

          this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.userId)});

          this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.profileImageUrl = this.getProfileImageUrl();
          };

          this.profileImageUrl = this.getProfileImageUrl();
        }
      );
  }*/

  getConnections(userId: string){
    this.profileService.getUserConnections(userId)
      .subscribe(
        connections => {

          console.info("getting user connections");

          this.facebookConnected = connections.some(x=>x=="facebook");
          this.orcidConnected = connections.some(x=>x=="orcid");
        }
      )
  }

  getCoAuthors(userId: string) {
    console.log(userId);
    this.profileService.getCoAuthors(userId)
      .subscribe(
        authors => {
          console.log("getting user's co-authors");

          this.coauthors = authors;
        }
      )
  }

  editClicked() {
    this.editMode = true;
  }
  submitClicked() {
    this.save();
    this.editMode = false;
  }
  cancelClicked() {
    this.editMode = false;
  }

  save() {
    var result;

    result = this.profileService.updateUser(this.profileService.profile);

    result.subscribe(); //data => this.router.navigate(['users']));
  }

  checkAll(ev) {
    console.log("checking select all" + ev);
    this.profileService.profile.dataSets.forEach(x => (x as any).state = ev.target.checked)
  }

  isAllChecked() {
    if(null==this.profileService.profile.dataSets)
      return false;
    return this.profileService.profile.dataSets.every(_ => (_ as any).state);
  }

  deleteSelected(){
    let  dataSets: DataSetDetail[] = this.dataSetDetails.filter(x => !(x as any).state);

    this.profileService.saveDataSets(this.profileX.userId, dataSets.map( x => {
      let r:DataSetShort = new DataSetShort();
      r.source = x.source;
      r.dataSetId = x.id;
      r.claimed = x['claimed'];
      return r;
    }));

    this.profileService.getProfile();
  }

  getProfileImageUrl(): string{
    return "http://localhost:8080/api/users/"+ this.profileService.profile.userId +"/picture?random" + Math.random();
  }

  public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      setTimeout(() => {
        console.log('fileChangeEvent hello');
        this.uploader.uploadAll();
      }, 100);
    }
  }
}
