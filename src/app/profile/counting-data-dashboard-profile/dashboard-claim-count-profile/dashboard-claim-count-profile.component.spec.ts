import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClaimCountProfileComponent } from './dashboard-claim-count-profile.component';

describe('DashboardClaimCountProfileComponent', () => {
  let component: DashboardClaimCountProfileComponent;
  let fixture: ComponentFixture<DashboardClaimCountProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClaimCountProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClaimCountProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
