import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CountingDataDashboardComponent} from './counting-data-dashboard.component';

describe('CountingDataDashboardComponent', () => {
    let component: CountingDataDashboardComponent;
    let fixture: ComponentFixture<CountingDataDashboardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CountingDataDashboardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CountingDataDashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
