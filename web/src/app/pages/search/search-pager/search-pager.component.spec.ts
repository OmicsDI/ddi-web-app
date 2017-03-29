import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPagerComponent } from './search-pager.component';

describe('SearchPagerComponent', () => {
  let component: SearchPagerComponent;
  let fixture: ComponentFixture<SearchPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
