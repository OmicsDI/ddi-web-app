import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCitationsCountComponent} from './dashboard-citations-count.component';

describe('DashboardCitationsCountComponent', () => {
    let component: DashboardCitationsCountComponent;
    let fixture: ComponentFixture<DashboardCitationsCountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardCitationsCountComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardCitationsCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
