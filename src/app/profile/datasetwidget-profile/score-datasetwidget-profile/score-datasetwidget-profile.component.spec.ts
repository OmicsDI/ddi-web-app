import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDatasetwidgetProfileComponent } from './score-datasetwidget-profile.component';

describe('ScoreDatasetwidgetProfileComponent', () => {
  let component: ScoreDatasetwidgetProfileComponent;
  let fixture: ComponentFixture<ScoreDatasetwidgetProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDatasetwidgetProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDatasetwidgetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
