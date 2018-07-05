import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardViewsCountComponent} from './dashboard-views-count.component';

describe('DashboardViewsCountComponent', () => {
    let component: DashboardViewsCountComponent;
    let fixture: ComponentFixture<DashboardViewsCountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardViewsCountComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardViewsCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
