import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDashboardComponent } from './nav-dashboard.component';

describe('NavDashboardComponent', () => {
  let component: NavDashboardComponent;
  let fixture: ComponentFixture<NavDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
