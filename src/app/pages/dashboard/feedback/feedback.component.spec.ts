import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFeedbackComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: DashboardFeedbackComponent;
  let fixture: ComponentFixture<DashboardFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
