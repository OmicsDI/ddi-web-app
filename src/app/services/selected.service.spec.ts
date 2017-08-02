import { TestBed, inject } from '@angular/core/testing';

import { SelectedService } from './selected.service';

describe('SelectedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedService]
    });
  });

  it('should be created', inject([SelectedService], (service: SelectedService) => {
    expect(service).toBeTruthy();
  }));
});
