/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginLauncherComponent } from './login-launcher.component';

describe('LoginLauncherComponent', () => {
  let component: LoginLauncherComponent;
  let fixture: ComponentFixture<LoginLauncherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginLauncherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
