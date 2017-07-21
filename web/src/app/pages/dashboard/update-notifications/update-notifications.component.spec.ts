import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotificationsComponent } from './update-notifications.component';

describe('UpdateNotificationsComponent', () => {
  let component: UpdateNotificationsComponent;
  let fixture: ComponentFixture<UpdateNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
