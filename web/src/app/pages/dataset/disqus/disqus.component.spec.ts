/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisqusComponent } from './disqus.component';

describe('DisqusComponent', () => {
  let component: DisqusComponent;
  let fixture: ComponentFixture<DisqusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisqusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisqusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
