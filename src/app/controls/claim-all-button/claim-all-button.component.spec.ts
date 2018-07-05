import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ClaimAllButtonComponent} from './claim-all-button.component';

describe('ClaimAllButtonComponent', () => {
    let component: ClaimAllButtonComponent;
    let fixture: ComponentFixture<ClaimAllButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClaimAllButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimAllButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
