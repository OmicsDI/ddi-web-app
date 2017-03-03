import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(public http: Http) {
    console.info("LoginDialogComponent ctor");
  }

  ngOnInit() {
  }

  logError(err: string){
    console.error(err);
  }

  redirect(url: string){
    window.location.href = url;
  }

  loginElixir(){
    console.error("ERROR YOU DID!");

    let url2 = 'https://sandbox.orcid.org/oauth/signin?client_id=APP-FBTNY1E6990OKN73&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fsignin%2Forcid&scope=%2Fauthenticate&state=13725027-f513-4154-9774-d3e594f3206b';

    //window.location.href = url2;

    this.http.get("http://localhost:8088/api/login?provider=elixir")
      .map(res => res.text())
      .subscribe(
        data => this.redirect(data),
        err => this.logError(err),
        () => console.log('Random Quote Complete')
      );
  }

}
