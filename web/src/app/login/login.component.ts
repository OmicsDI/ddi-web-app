import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http: Http) {
    console.info("LoginComponent ctor");
  }

  ngOnInit() {
  }

  logError(err: string){
    console.error(err);
  }

  redirect(url: string){
    window.location.href = url;
  }

  submit(provider: string, scope: string){
      var f = document.createElement("form");
      f.setAttribute('method',"post");
      f.setAttribute('action',"signin/" + provider);

      var i = document.createElement("input"); //input element, text
      i.setAttribute('type',"hidden");
      i.setAttribute('name',"scope");
      i.setAttribute('value',scope);

      var s = document.createElement("input"); //input element, Submit button
      s.setAttribute('type',"submit");
      s.setAttribute('value',"Submit");

      f.appendChild(i);
      f.appendChild(s);

      document.getElementsByTagName('body')[0].appendChild(f);

      f.submit();
    }
  }

