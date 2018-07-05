import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmDialogUnmergeComponent} from './confirm-dialog-unmerge.component';


describe('ConfirmDialogMergeComponent', () => {
    let component: ConfirmDialogUnmergeComponent;
    let fixture: ComponentFixture<ConfirmDialogUnmergeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmDialogUnmergeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmDialogUnmergeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
