import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../../services/profile.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppConfig} from "../../../app.config";
import {Router} from "@angular/router";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class DashboardUpdateComponent implements OnInit {

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
  public profile = this.profileService.profile;

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
    this.profileService.updateUser().subscribe(
        ()=> {
          this.router.navigate(["/profile"]);
        }
    );
  }

  cancelClicked() {
    //this.editMode = false;
    this.profileService.getProfile();
    this.router.navigate(["/profile"]);
  }

  onSubmit() {
    alert("submitd");
  }

  onCancel(){
    alert("canceld");
  }
}
