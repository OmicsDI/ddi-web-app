/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchFacetComponent } from './search-facet.component';

describe('SearchFacetComponent', () => {
  let component: SearchFacetComponent;
  let fixture: ComponentFixture<SearchFacetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFacetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFacetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
