import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetwidgetSmallDashboardComponent } from './datasetwidget-small-dashboard.component';

describe('DatasetwidgetSmallDashboardComponent', () => {
  let component: DatasetwidgetSmallDashboardComponent;
  let fixture: ComponentFixture<DatasetwidgetSmallDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetwidgetSmallDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetwidgetSmallDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
