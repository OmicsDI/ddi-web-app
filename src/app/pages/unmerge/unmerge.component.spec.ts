import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnmergeComponent} from './unmerge.component';

describe('UnmergeComponent', () => {
    let component: UnmergeComponent;
    let fixture: ComponentFixture<UnmergeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnmergeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnmergeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
