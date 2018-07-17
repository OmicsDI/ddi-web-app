import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

    returnTime: number;
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.returnTime = 3;
        const interval = setInterval( () => {
            this.returnTime = this.returnTime - 1;
            if ( this.returnTime < 0) {
                this.router.navigate(['home']);
            }
        }, 1000);
    }
}
