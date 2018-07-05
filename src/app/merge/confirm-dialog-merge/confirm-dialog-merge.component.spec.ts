import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDialogMergeComponent} from './confirm-dialog-merge.component';

describe('ConfirmDialogMergeComponent', () => {
    let component: ConfirmDialogMergeComponent;
    let fixture: ComponentFixture<ConfirmDialogMergeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmDialogMergeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogMergeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
