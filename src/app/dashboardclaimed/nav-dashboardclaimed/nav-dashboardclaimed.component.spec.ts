import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavDashboardclaimedComponent} from './nav-dashboardclaimed.component';

describe('NavDashboardclaimedComponent', () => {
    let component: NavDashboardclaimedComponent;
    let fixture: ComponentFixture<NavDashboardclaimedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavDashboardclaimedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavDashboardclaimedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
