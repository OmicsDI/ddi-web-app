import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchBoxLargeComponent} from './search-box-large.component';

describe('SearchBoxLargeComponent', () => {
    let component: SearchBoxLargeComponent;
    let fixture: ComponentFixture<SearchBoxLargeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchBoxLargeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBoxLargeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
