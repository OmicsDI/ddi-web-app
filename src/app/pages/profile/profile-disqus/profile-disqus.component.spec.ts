import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDisqusComponent } from './profile-disqus.component';

describe('ProfileDisqusComponent', () => {
  let component: ProfileDisqusComponent;
  let fixture: ComponentFixture<ProfileDisqusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDisqusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDisqusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
