import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchBoxSearchComponent} from './search-box-search.component';

describe('SearchBoxSearchComponent', () => {
    let component: SearchBoxSearchComponent;
    let fixture: ComponentFixture<SearchBoxSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchBoxSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchBoxSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
