import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';

@Directive({
    selector: '[appIsLogged]'
})
export class IsLoggedDirective {

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private authService: AuthService) {
        this.authService.loggedIn().then(isLogged => {
            if (isLogged) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                return true;
            }
            this.viewContainer.clear();
        });
    }
}
