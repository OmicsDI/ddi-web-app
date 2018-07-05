import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OmicsImageSearchDatasetselectedComponent} from "./omics-image-search-datasetselected.component";


describe('OmicsImageSearchDatasetselectedComponent', () => {
  let component: OmicsImageSearchDatasetselectedComponent;
  let fixture: ComponentFixture<OmicsImageSearchDatasetselectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmicsImageSearchDatasetselectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmicsImageSearchDatasetselectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
