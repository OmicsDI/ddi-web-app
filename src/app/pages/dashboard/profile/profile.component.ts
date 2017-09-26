import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Profile} from "../../../model/Profile";
import {forEach} from "@angular/router/src/utils/collection";
import {DataSetShort} from "../../../model/DataSetShort";
import {DataSetService} from "../../../services/dataset.service";
import {DataSetDetail} from "../../../model/DataSetDetail";
import {AppConfig} from "../../../app.config";
import {FileUploader} from 'ng2-file-upload';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class DashboardProfileComponent implements OnInit {
  profileX : Profile = new Profile;
  public name: String;
  form: FormGroup;
  editMode: boolean = false;
  facebookConnected: boolean = false;
  orcidConnected: boolean = false;
  dataSetDetails:DataSetDetail[] = new Array<DataSetDetail>();
  profileImageUrl: string = "";
  coauthors: string[];
  userId: string = "xxx";
  username: string = null;



  constructor(private profileService: ProfileService
      ,private dataSetService: DataSetService
      ,private formBuilder: FormBuilder
      ,private appConfig: AppConfig
      ,private router: Router
      ,private route: ActivatedRoute) {
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
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.getProfile(this.username);
    })
  }

  getProfile(username: string  = null){
    console.log("current username:" + username);

    if(username){
      this.profileService.getPublicProfile(username)
          .subscribe(
              profile => {
                if(!profile){
                  this.router.navigate(["/notfound"]);
                  return;
                }

                this.profileX = profile;
                //this.profileImageUrl = this.getProfileImageUrl();
              }
          )
    }else{
      this.profileService.getProfile()
          .subscribe(
              profile => {
                console.log('getting profile')

                this.profileX = profile;
                this.name = profile.userName;
                this.dataSetDetails = [];

                this.userId =  profile.userId;

                //this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.userId)});
                //this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                //  this.profileImageUrl = this.getProfileImageUrl();
                //};
                //this.profileImageUrl = this.getProfileImageUrl();
              }
          );
    }
  }

  updateProfile(){
    this.profileService.updateUser().subscribe();
  }

  checkAll(ev) {
    console.log("checking select all" + ev);
    this.profileX.dataSets.forEach(x => (x as any).state = ev.target.checked)
  }

  isAllChecked() {
    if(null==this.profileX.dataSets)
      return false;
    return this.profileX.dataSets.every(_ => (_ as any).state);
  }

  deleteSelected(){
    let  dataSets: DataSetDetail[] = this.dataSetDetails.filter(x => !(x as any).state);

    this.profileService.saveDataSets(this.profileX.userId, dataSets.map( x => {
      let r:DataSetShort = new DataSetShort();
      r.source = x.source;
      r.id = x.id;
      r.claimed = x['claimed'];
      return r;
    }));

    this.getProfile(this.username);
  }

  isMy(): boolean{
    return (null==this.username)
  }
}
