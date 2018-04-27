import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownSearchComponent } from './drop-down-search.component';

describe('DropDownSearchComponent', () => {
  let component: DropDownSearchComponent;
  let fixture: ComponentFixture<DropDownSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
