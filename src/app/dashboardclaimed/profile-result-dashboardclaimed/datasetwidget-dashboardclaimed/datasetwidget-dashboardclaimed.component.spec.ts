import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetwidgetDashboardclaimedComponent} from './datasetwidget-dashboardclaimed.component';

describe('DatasetwidgetDashboardclaimedComponent', () => {
    let component: DatasetwidgetDashboardclaimedComponent;
    let fixture: ComponentFixture<DatasetwidgetDashboardclaimedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatasetwidgetDashboardclaimedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetwidgetDashboardclaimedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
