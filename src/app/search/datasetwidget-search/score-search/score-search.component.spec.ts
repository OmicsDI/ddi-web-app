import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScoreSearchComponent} from './score-search.component';

describe('ScoreSearchComponent', () => {
    let component: ScoreSearchComponent;
    let fixture: ComponentFixture<ScoreSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScoreSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
