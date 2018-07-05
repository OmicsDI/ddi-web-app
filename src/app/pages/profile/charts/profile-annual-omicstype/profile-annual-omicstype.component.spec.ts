import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAnnualOmicstypeComponent } from './profile-annual-omicstype.component';

describe('ProfileAnnualOmicstypeComponent', () => {
  let component: ProfileAnnualOmicstypeComponent;
  let fixture: ComponentFixture<ProfileAnnualOmicstypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAnnualOmicstypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAnnualOmicstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
