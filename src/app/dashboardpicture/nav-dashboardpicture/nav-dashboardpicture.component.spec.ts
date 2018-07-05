import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDashboardpictureComponent } from './nav-dashboardpicture.component';

describe('NavDashboardpictureComponent', () => {
  let component: NavDashboardpictureComponent;
  let fixture: ComponentFixture<NavDashboardpictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDashboardpictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDashboardpictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
