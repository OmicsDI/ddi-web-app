/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutocompleteJComponent } from './autocomplete-j.component';

describe('AutocompleteJComponent', () => {
  let component: AutocompleteJComponent;
  let fixture: ComponentFixture<AutocompleteJComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteJComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteJComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
