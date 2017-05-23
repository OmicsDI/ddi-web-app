import {Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
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
export class ProfileInfoComponent implements OnInit, OnChanges {

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

  @Input() profile: Profile = new Profile();
  @Output() change = new EventEmitter();

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
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if(propName=="profile"){
        if(null!=chng.currentValue){
          console.log(`profile-info ngOnChanges: ${chng.currentValue.userId}`);
          this.profile = chng.currentValue;
          this.profileImageUrl = this.getProfileImageUrl();
          this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.profile.userId)});
          this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.profileImageUrl = this.getProfileImageUrl();
          };
        }
      }
    }
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

    result = this.profileService.updateUser(this.profile);

    result.subscribe(); //data => this.router.navigate(['users']));
  }

  getProfileImageUrl(): string{
    return this.appConfig.getProfileImageUrl(this.profile.userId);
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
