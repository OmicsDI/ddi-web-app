import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DatasetwidgetSearchComponent} from './datasetwidget-search.component';

describe('DatasetwidgetSearchComponent', () => {
    let component: DatasetwidgetSearchComponent;
    let fixture: ComponentFixture<DatasetwidgetSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatasetwidgetSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatasetwidgetSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
