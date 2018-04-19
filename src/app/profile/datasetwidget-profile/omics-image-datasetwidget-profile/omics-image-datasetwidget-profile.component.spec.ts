import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OmicsImageDatasetwidgetProfileComponent} from "./omics-image-datasetwidget-profile.component";


describe('OmicsImageDatasetwidgetProfileComponent', () => {
  let component: OmicsImageDatasetwidgetProfileComponent;
  let fixture: ComponentFixture<OmicsImageDatasetwidgetProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmicsImageDatasetwidgetProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmicsImageDatasetwidgetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
