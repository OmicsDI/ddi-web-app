import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationDialogComponent } from './citation-dialog.component';

describe('CitationDialogComponent', () => {
  let component: CitationDialogComponent;
  let fixture: ComponentFixture<CitationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
