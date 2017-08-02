import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQueryComponent } from './search-query.component';

describe('SearchQueryComponent', () => {
  let component: SearchQueryComponent;
  let fixture: ComponentFixture<SearchQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
