import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClaimCountComponent } from './dashboard-claim-count.component';

describe('DashboardClaimCountComponent', () => {
  let component: DashboardClaimCountComponent;
  let fixture: ComponentFixture<DashboardClaimCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClaimCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClaimCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
