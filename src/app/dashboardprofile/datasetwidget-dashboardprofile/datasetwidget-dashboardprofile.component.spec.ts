import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetwidgetDashboardprofileComponent} from './datasetwidget-dashboardprofile.component';

describe('DatasetwidgetDashboardprofileComponent', () => {
    let component: DatasetwidgetDashboardprofileComponent;
    let fixture: ComponentFixture<DatasetwidgetDashboardprofileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatasetwidgetDashboardprofileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetwidgetDashboardprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
