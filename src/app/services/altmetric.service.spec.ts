import { TestBed, inject } from '@angular/core/testing';

import { AltmetricService } from './altmetric.service';

describe('AltmetricService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AltmetricService]
    });
  });

  it('should be created', inject([AltmetricService], (service: AltmetricService) => {
    expect(service).toBeTruthy();
  }));
});
