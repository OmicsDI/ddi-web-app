import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTotalComponent } from './profile-total.component';

describe('ProfileTotalComponent', () => {
  let component: ProfileTotalComponent;
  let fixture: ComponentFixture<ProfileTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
