import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Router} from '@angular/router';
import {Profile} from 'model/Profile';
import {Observable} from 'rxjs/Observable';

@Directive({
    selector: '[appOnlyAdmin]'
})
export class OnlyAdminDirective implements OnInit {

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, public profileService: ProfileService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.profileService.getProfile().subscribe(profile => {
            this.checkPermission(profile).subscribe(approval => {
                if (!approval) {
                    this.router.navigate(['unauthorized']);
                }
            });
        });
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
