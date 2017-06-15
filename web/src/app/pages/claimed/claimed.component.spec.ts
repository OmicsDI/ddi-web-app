import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimedComponent } from './claimed.component';

describe('ClaimedComponent', () => {
  let component: ClaimedComponent;
  let fixture: ComponentFixture<ClaimedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
