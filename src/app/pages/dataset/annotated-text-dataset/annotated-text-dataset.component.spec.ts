import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AnnotatedTextDatasetComponent} from './annotated-text-dataset.component';


describe('AnnotatedTextDatasetComponent', () => {
    let component: AnnotatedTextDatasetComponent;
    let fixture: ComponentFixture<AnnotatedTextDatasetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AnnotatedTextDatasetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AnnotatedTextDatasetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
