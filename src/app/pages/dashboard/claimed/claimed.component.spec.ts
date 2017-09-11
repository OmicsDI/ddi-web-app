import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClaimedComponent } from './claimed.component';

describe('ClaimedComponent', () => {
  let component: DashboardClaimedComponent;
  let fixture: ComponentFixture<DashboardClaimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClaimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
