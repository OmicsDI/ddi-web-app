import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectedComponent} from './selected.component';

describe('SelectedComponent', () => {
    let component: SelectedComponent;
    let fixture: ComponentFixture<SelectedComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectedComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
