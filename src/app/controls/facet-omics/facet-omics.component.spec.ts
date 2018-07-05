import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FacetOmicsComponent} from './facet-omics.component';

describe('FacetOmicsComponent', () => {
    let component: FacetOmicsComponent;
    let fixture: ComponentFixture<FacetOmicsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FacetOmicsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FacetOmicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
