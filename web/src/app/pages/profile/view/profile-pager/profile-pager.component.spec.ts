import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePagerComponent } from './profile-pager.component';

describe('ProfilePagerComponent', () => {
  let component: ProfilePagerComponent;
  let fixture: ComponentFixture<ProfilePagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
