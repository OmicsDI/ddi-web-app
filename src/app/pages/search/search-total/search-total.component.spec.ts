import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTotalComponent } from './search-total.component';

describe('SearchTotalComponent', () => {
  let component: SearchTotalComponent;
  let fixture: ComponentFixture<SearchTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
