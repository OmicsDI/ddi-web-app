import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../../../app.config";
import {ProfileService} from "../../../services/profile.service";
import {FileUploader} from "ng2-file-upload";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css',
    '../profile.css']
})
export class UpdateProfileComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private appConfig: AppConfig,
              private router:Router) {
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

  public uploader:FileUploader;
  form: FormGroup;
  public profileImageUrl: string;

  ngOnInit() {

    if(!this.profileService.profile){
      this.router.navigate(["/profile"]);
      return;
    }

    this.uploader = new FileUploader({url: this.appConfig.getProfileUploadImageUrl(this.profileService.profile.userId)});
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      this.profileImageUrl = this.getProfileImageUrl();
    };
    this.profileImageUrl = this.getProfileImageUrl();
  }

  getProfileImageUrl(): string{

      return this.appConfig.getProfileImageUrl(this.profileService.profile.userId);

  }

  public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      setTimeout(() => {
        console.log('fileChangeEvent hello');
        this.uploader.uploadAll();
      }, 100);
    }
  }

  submitClicked() {
    this.profileService.updateUser().subscribe();
    var self = this;
    setTimeout(function() {
      self.router.navigate(["/profile"]);
    }, 1000);

  }

  cancelClicked() {
    //this.editMode = false;
    this.profileService.getProfile();
    this.router.navigate(["/profile"]);
  }
}
