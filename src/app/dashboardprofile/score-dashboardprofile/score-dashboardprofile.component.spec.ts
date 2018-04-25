import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreDashboardprofileComponent } from './score-dashboardprofile.component';

describe('ScoreDashboardprofileComponent', () => {
  let component: ScoreDashboardprofileComponent;
  let fixture: ComponentFixture<ScoreDashboardprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreDashboardprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreDashboardprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
