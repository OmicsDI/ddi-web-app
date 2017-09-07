import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactsComponent } from './profile-contacts.component';

describe('ProfileContactsComponent', () => {
  let component: ProfileContactsComponent;
  let fixture: ComponentFixture<ProfileContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
