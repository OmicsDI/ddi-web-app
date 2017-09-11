import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConnectionsComponent } from './profile-connections.component';

describe('ProfileConnectionsComponent', () => {
  let component: ProfileConnectionsComponent;
  let fixture: ComponentFixture<ProfileConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileConnectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
