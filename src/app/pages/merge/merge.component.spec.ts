import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeComponent } from './merge.component';

describe('MergeComponent', () => {
  let component: MergeComponent;
  let fixture: ComponentFixture<MergeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
