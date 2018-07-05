import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginLauncherComponent} from './login-launcher.component';

describe('LoginLauncherComponent', () => {
    let component: LoginLauncherComponent;
    let fixture: ComponentFixture<LoginLauncherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginLauncherComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginLauncherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
