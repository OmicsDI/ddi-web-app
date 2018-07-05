import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ScoreDatasetComponent} from './score-dataset.component';


describe('ScoreDatasetComponent', () => {
    let component: ScoreDatasetComponent;
    let fixture: ComponentFixture<ScoreDatasetComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScoreDatasetComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScoreDatasetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
