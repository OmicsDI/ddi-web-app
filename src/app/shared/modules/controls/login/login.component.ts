import {Component, OnInit} from '@angular/core';
import {AppConfig} from 'app/app.config';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-login-dialog',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(public http: HttpClient, public appConfig: AppConfig) {
    }

    ngOnInit() {
    }

    redirect(url: string) {
        window.location.href = url;
    }

    submit(provider: string, scope: string) {
        window.location.href = this.appConfig.getLoginUrl(provider, scope) + '&' + Math.random().toString(36).substring(7);
    }

    subminForm(provider: string, scope: string) {
        const f = document.createElement('form');
        f.setAttribute('method', 'post');
        f.setAttribute('action', 'signin/' + provider);

        const i = document.createElement('input'); // input element, text
        i.setAttribute('type', 'hidden');
        i.setAttribute('name', 'scope');
        i.setAttribute('value', scope);

        const s = document.createElement('input'); // input element, Submit button
        s.setAttribute('type', 'submit');
        s.setAttribute('value', 'Submit');

        f.appendChild(i);
        f.appendChild(s);

        document.getElementsByTagName('body')[0].appendChild(f);

        f.submit();
    }
}

