import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotwordsComponent} from './hotwords.component';

describe('HotwordsComponent', () => {
    let component: HotwordsComponent;
    let fixture: ComponentFixture<HotwordsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HotwordsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotwordsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
