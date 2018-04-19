import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OmicsImageSearchComponent} from "./omics-image-search.component";


describe('OmicsImageSearchComponent', () => {
  let component: OmicsImageSearchComponent;
  let fixture: ComponentFixture<OmicsImageSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmicsImageSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmicsImageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
