import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimButtonComponent } from './claim-button.component';

describe('ClaimButtonComponent', () => {
  let component: ClaimButtonComponent;
  let fixture: ComponentFixture<ClaimButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
