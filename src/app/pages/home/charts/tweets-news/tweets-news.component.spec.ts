/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TweetsNewsComponent} from './tweets-news.component';

describe('TweetsNewsComponent', () => {
    let component: TweetsNewsComponent;
    let fixture: ComponentFixture<TweetsNewsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TweetsNewsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TweetsNewsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
