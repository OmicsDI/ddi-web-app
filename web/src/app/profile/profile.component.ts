import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../profile.service";
import {Profile} from "../profile";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  profileX : Profile = new Profile;
  public name: String;
  form: FormGroup;
  editMode: boolean = false;
  facebookConnected: boolean = false;
  orcidConnected: boolean = false;

  constructor(private profileService: ProfileService
              ,formBuilder: FormBuilder) {
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
    this.getProfile();
  }

  getProfile(){
    this.profileService.getProfile()
      .subscribe(
        profile => {
          this.profileX = profile;
          this.name = profile.userName;
          let userId =  profile.userId
          this.getConnections(userId);
        }
      );
  }

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

    result = this.profileService.updateUser(this.profileX);

    result.subscribe(); //data => this.router.navigate(['users']));
  }

}
