import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ClaimButtonDatasetComponent} from './claim-button-dataset.component';


describe('ClaimButtonDatasetComponent', () => {
    let component: ClaimButtonDatasetComponent;
    let fixture: ComponentFixture<ClaimButtonDatasetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ClaimButtonDatasetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimButtonDatasetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
