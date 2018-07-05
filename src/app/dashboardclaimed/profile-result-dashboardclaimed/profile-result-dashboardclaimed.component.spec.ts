import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfileResultDashboardclaimedComponent} from './profile-result-dashboardclaimed.component';

describe('ProfileResultDashboardclaimedComponent', () => {
    let component: ProfileResultDashboardclaimedComponent;
    let fixture: ComponentFixture<ProfileResultDashboardclaimedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfileResultDashboardclaimedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileResultDashboardclaimedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
