import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCitationsCountProfileComponent} from './dashboard-citations-count-profile.component';

describe('DashboardCitationsCountProfileComponent', () => {
    let component: DashboardCitationsCountProfileComponent;
    let fixture: ComponentFixture<DashboardCitationsCountProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardCitationsCountProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardCitationsCountProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
