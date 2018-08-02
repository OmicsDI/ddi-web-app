import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

    returnTime = 3;
    constructor(private router: Router) {
    }

    ngOnInit() {
        this.sleep(this.returnTime);
    }

    private sleep(second: number) {
        if (second === 0) {
            this.router.navigate(['home']);
        }
        setTimeout(() => {
            this.returnTime -= 1;
            this.sleep(this.returnTime);
        }, 1000);
    }
}
