import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileResultComponent } from './profile-result.component';

describe('ProfileResultComponent', () => {
  let component: ProfileResultComponent;
  let fixture: ComponentFixture<ProfileResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
