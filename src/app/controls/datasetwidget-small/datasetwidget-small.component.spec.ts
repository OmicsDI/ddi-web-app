import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetwidgetSmallComponent} from './datasetwidget-small.component';

describe('DatasetwidgetSmallComponent', () => {
    let component: DatasetwidgetSmallComponent;
    let fixture: ComponentFixture<DatasetwidgetSmallComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatasetwidgetSmallComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetwidgetSmallComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
