import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavDashboardsettingsComponent} from './nav-dashboardsettings.component';

describe('NavDashboardsettingsComponent', () => {
    let component: NavDashboardsettingsComponent;
    let fixture: ComponentFixture<NavDashboardsettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavDashboardsettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavDashboardsettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
