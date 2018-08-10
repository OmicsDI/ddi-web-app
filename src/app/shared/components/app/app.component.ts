import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SelectedService} from '../../services/selected.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title: string;
    homePage = true;
    public simpleNotificationsOptions = {timeOut: 500, position: ['bottom', 'right'], animate: 'scale'};

    constructor(public auth: AuthService, private route: ActivatedRoute, private router: Router
        , public selectedService: SelectedService) {

        if (window.location.href.startsWith('http://www.omicsdi.org')) {
            window.location.href = window.location.href.replace('http:', 'https:');
        }

        this.title = this.getTitle();
    }

    ngOnInit() {
        this.router.events.subscribe(() => {
            this.homePage = (this.router.url === '/home') || (this.router.url === '/');
        });
    }

    getTitle(): string {
        const result = 'Omics DI 2.0';
        return result;
    }

    gotoHelp() {
        window.location.href = 'http://blog.omicsdi.org/';
    }


    toSubmission() {
        window.location.href = 'https://www.ebi.ac.uk/biostudies/';
    }

}
