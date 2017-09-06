import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: DashboardUpdateComponent;
  let fixture: ComponentFixture<DashboardUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
