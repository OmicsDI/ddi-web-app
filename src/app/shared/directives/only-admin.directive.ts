import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Router} from '@angular/router';
import {Profile} from 'model/Profile';
import {Observable} from 'rxjs/Observable';
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
        if (this.authService.loggedIn()) {
            const profile = this.profileService.getProfileFromLocal();
            this.checkPermission(profile).subscribe(approval => {
                if (!approval) {
                    this.router.navigate(['unauthorized']);
                }
            });
        } else {
            this.router.navigate(['unauthorized']);
        }
    }

    checkPermission(profile: Profile): Observable<boolean> {
        return this.profileService.getAdminUsers().map( x => {
            if (profile.userId !== null && x.json().users.indexOf(profile.userId) > -1) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                return true;
            }
            this.viewContainer.clear();
            return false;
        });
    }
}
