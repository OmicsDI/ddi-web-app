import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LatestDatasetsComponent} from './latest-datasets.component';

describe('LatestDatasetsComponent', () => {
    let component: LatestDatasetsComponent;
    let fixture: ComponentFixture<LatestDatasetsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LatestDatasetsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LatestDatasetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
