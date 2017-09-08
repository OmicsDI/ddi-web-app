import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetWidgetComponent } from './datasetwidget.component';

describe('DatasetComponent', () => {
  let component: DatasetWidgetComponent;
  let fixture: ComponentFixture<DatasetWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
