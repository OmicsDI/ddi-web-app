import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDatasetselectedComponent } from './score-datasetselected.component';

describe('ScoreDatasetselectedComponent', () => {
  let component: ScoreDatasetselectedComponent;
  let fixture: ComponentFixture<ScoreDatasetselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDatasetselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDatasetselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
