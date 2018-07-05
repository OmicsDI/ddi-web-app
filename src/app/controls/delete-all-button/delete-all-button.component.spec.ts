import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAllButtonComponent} from './delete-all-button.component';

describe('DeleteAllButtonComponent', () => {
    let component: DeleteAllButtonComponent;
    let fixture: ComponentFixture<DeleteAllButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeleteAllButtonComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteAllButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
