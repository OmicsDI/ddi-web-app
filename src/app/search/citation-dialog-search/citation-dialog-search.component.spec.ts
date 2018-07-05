import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CitationDialogSearchComponent} from './citation-dialog-search.component';

describe('CitationDialogSearchComponent', () => {
    let component: CitationDialogSearchComponent;
    let fixture: ComponentFixture<CitationDialogSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CitationDialogSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CitationDialogSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
