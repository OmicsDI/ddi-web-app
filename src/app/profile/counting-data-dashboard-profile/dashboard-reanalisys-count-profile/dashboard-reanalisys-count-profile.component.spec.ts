import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardReanalisysCountProfileComponent} from './dashboard-reanalisys-count-profile.component';

describe('DashboardReanalisysCountProfileComponent', () => {
    let component: DashboardReanalisysCountProfileComponent;
    let fixture: ComponentFixture<DashboardReanalisysCountProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DashboardReanalisysCountProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardReanalisysCountProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
