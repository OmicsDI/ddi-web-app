import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AltmetricImageDatasetComponent} from "./altmetric-image-dataset.component";


describe('AltmetricImageDatasetComponent', () => {
  let component: AltmetricImageDatasetComponent;
  let fixture: ComponentFixture<AltmetricImageDatasetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltmetricImageDatasetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltmetricImageDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
