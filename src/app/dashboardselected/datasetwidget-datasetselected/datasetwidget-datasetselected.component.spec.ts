import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetwidgetDatasetselectedComponent } from './datasetwidget-datasetselected.component';

describe('DatasetwidgetDatasetselectedComponent', () => {
  let component: DatasetwidgetDatasetselectedComponent;
  let fixture: ComponentFixture<DatasetwidgetDatasetselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetwidgetDatasetselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetwidgetDatasetselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
