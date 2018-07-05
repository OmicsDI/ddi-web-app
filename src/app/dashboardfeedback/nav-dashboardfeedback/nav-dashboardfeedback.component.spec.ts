import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NavDashboardfeedbackComponent} from './nav-dashboardfeedback.component';

describe('NavDashboardfeedbackComponent', () => {
    let component: NavDashboardfeedbackComponent;
    let fixture: ComponentFixture<NavDashboardfeedbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NavDashboardfeedbackComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavDashboardfeedbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
