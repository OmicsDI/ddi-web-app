import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CountingDataDashboardProfileComponent} from './counting-data-dashboard-profile.component';

describe('CountingDataDashboardProfileComponent', () => {
    let component: CountingDataDashboardProfileComponent;
    let fixture: ComponentFixture<CountingDataDashboardProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CountingDataDashboardProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CountingDataDashboardProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
