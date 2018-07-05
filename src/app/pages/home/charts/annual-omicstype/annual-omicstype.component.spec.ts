import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AnnualOmicstypeComponent} from './annual-omicstype.component';

describe('AnnualOmicstypeComponent', () => {
    let component: AnnualOmicstypeComponent;
    let fixture: ComponentFixture<AnnualOmicstypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnnualOmicstypeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnualOmicstypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
