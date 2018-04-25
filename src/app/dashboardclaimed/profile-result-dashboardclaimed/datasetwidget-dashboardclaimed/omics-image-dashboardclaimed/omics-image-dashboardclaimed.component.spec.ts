import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {OmicsImageDashboardclaimedComponent} from "./omics-image-dashboardclaimed.component";


describe('OmicsImageDashboardclaimedComponent', () => {
  let component: OmicsImageDashboardclaimedComponent;
  let fixture: ComponentFixture<OmicsImageDashboardclaimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmicsImageDashboardclaimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmicsImageDashboardclaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
