import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderSearchComponent } from './query-builder-search.component';

describe('QueryBuilderSearchComponent', () => {
  let component: QueryBuilderSearchComponent;
  let fixture: ComponentFixture<QueryBuilderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryBuilderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
