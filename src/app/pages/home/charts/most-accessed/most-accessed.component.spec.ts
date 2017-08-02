/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MostAccessedComponent } from './most-accessed.component';

describe('MostAccessedComponent', () => {
  let component: MostAccessedComponent;
  let fixture: ComponentFixture<MostAccessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostAccessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostAccessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
