import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CitationDialogDashboardprofileComponent} from './citation-dialog-dashboardprofile.component';

describe('CitationDialogDashboardprofileComponent', () => {
    let component: CitationDialogDashboardprofileComponent;
    let fixture: ComponentFixture<CitationDialogDashboardprofileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CitationDialogDashboardprofileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CitationDialogDashboardprofileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
