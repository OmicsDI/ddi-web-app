import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AltmetricImageComponent} from './altmetric-image.component';

describe('AltmetricImageComponent', () => {
    let component: AltmetricImageComponent;
    let fixture: ComponentFixture<AltmetricImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AltmetricImageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AltmetricImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
