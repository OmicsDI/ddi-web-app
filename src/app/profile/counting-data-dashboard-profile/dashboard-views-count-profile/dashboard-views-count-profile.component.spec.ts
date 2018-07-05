import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardViewsCountProfileComponent} from './dashboard-views-count-profile.component';

describe('DashboardViewsCountProfileComponent', () => {
    let component: DashboardViewsCountProfileComponent;
    let fixture: ComponentFixture<DashboardViewsCountProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardViewsCountProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardViewsCountProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
