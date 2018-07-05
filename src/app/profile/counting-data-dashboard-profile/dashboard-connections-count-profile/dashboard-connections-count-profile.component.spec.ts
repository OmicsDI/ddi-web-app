import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardConnectionsCountProfileComponent} from './dashboard-connections-count-profile.component';

describe('DashboardConnectionsCountProfileComponent', () => {
    let component: DashboardConnectionsCountProfileComponent;
    let fixture: ComponentFixture<DashboardConnectionsCountProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardConnectionsCountProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardConnectionsCountProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
