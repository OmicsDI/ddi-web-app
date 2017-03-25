/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatabaseComponent } from './database.component';

describe('DatabaseComponent', () => {
  let component: DatabaseComponent;
  let fixture: ComponentFixture<DatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
