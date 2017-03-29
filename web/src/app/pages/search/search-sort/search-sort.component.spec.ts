import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSortComponent } from './search-sort.component';

describe('SearchSortComponent', () => {
  let component: SearchSortComponent;
  let fixture: ComponentFixture<SearchSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
