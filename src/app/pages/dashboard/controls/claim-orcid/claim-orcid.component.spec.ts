import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClaimOrcidComponent} from './claim-orcid.component';

describe('ClaimOrcidComponent', () => {
    let component: ClaimOrcidComponent;
    let fixture: ComponentFixture<ClaimOrcidComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClaimOrcidComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimOrcidComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
