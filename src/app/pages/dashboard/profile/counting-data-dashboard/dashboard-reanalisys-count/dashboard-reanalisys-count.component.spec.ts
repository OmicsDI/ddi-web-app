import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReanalisysCountComponent } from './dashboard-reanalisys-count.component';

describe('DashboardReanalisysCountComponent', () => {
  let component: DashboardReanalisysCountComponent;
  let fixture: ComponentFixture<DashboardReanalisysCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardReanalisysCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardReanalisysCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
