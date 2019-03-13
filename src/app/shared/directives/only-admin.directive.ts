import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Router} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';

@Directive({
    selector: '[appOnlyAdmin]'
})
export class OnlyAdminDirective implements OnInit {

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private authService: AuthService,
                public profileService: ProfileService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.authService.loggedIn().then(isLogged => {
            if (isLogged) {
                const profile = this.profileService.getProfileFromLocal();
                const approval = profile.roles.split(',').indexOf('ADMIN') > -1;
                if (!approval) {
                    this.router.navigate(['unauthorized']);
                }
            } else {
                this.router.navigate(['unauthorized']);
            }
        });
    }
}
