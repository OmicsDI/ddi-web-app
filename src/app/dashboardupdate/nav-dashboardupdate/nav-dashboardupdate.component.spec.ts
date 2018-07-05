import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavDashboardupdateComponent} from './nav-dashboardupdate.component';

describe('NavDashboardupdateComponent', () => {
    let component: NavDashboardupdateComponent;
    let fixture: ComponentFixture<NavDashboardupdateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavDashboardupdateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavDashboardupdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
