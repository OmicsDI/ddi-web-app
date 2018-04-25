import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackDashboardfeedbackComponent } from './feedback-dashboardfeedback.component';

describe('FeedbackDashboardfeedbackComponent', () => {
  let component: FeedbackDashboardfeedbackComponent;
  let fixture: ComponentFixture<FeedbackDashboardfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackDashboardfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackDashboardfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
