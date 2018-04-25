import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDashboardselectedComponent } from './nav-dashboardselected.component';

describe('NavDashboardselectedComponent', () => {
  let component: NavDashboardselectedComponent;
  let fixture: ComponentFixture<NavDashboardselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDashboardselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDashboardselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
