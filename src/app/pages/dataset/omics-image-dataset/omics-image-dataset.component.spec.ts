import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OmicsImageDatasetComponent} from "./omics-image-dataset.component";


describe('OmicsImageDatasetComponent', () => {
  let component: OmicsImageDatasetComponent;
  let fixture: ComponentFixture<OmicsImageDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmicsImageDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmicsImageDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
