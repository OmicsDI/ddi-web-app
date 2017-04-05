import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatedTextComponent } from './annotated-text.component';

describe('AnnotatedTextComponent', () => {
  let component: AnnotatedTextComponent;
  let fixture: ComponentFixture<AnnotatedTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatedTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatedTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
