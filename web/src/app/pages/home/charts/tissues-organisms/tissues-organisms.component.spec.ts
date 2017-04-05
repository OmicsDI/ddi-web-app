/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TissuesOrganismsComponent } from './tissues-organisms.component';

describe('TissuesOrganismsComponent', () => {
  let component: TissuesOrganismsComponent;
  let fixture: ComponentFixture<TissuesOrganismsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TissuesOrganismsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TissuesOrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
