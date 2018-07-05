import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OmicsImageComponent} from './omics-image.component';

describe('OmicsImageComponent', () => {
    let component: OmicsImageComponent;
    let fixture: ComponentFixture<OmicsImageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OmicsImageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OmicsImageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
