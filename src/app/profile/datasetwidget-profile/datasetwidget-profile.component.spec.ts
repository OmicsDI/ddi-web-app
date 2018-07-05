import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetWidgetProfileComponent} from './datasetwidget-profile.component';

describe('DatasetWidgetProfileComponent', () => {
    let component: DatasetWidgetProfileComponent;
    let fixture: ComponentFixture<DatasetWidgetProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatasetWidgetProfileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetWidgetProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
