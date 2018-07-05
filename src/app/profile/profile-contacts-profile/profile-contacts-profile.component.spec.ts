import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactsProfileComponent } from './profile-contacts-profile.component';

describe('ProfileContactsProfileComponent', () => {
  let component: ProfileContactsProfileComponent;
  let fixture: ComponentFixture<ProfileContactsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileContactsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContactsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
