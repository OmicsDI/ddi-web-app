import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardConnectionsCountComponent} from './dashboard-connections-count.component';

describe('DashboardConnectionsCountComponent', () => {
    let component: DashboardConnectionsCountComponent;
    let fixture: ComponentFixture<DashboardConnectionsCountComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardConnectionsCountComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardConnectionsCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
