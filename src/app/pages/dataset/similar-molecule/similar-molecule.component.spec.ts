import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SimilarMoleculeComponent} from './similar-molecule.component';

describe('SimilarMoleculeComponent', () => {
    let component: SimilarMoleculeComponent;
    let fixture: ComponentFixture<SimilarMoleculeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimilarMoleculeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimilarMoleculeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
