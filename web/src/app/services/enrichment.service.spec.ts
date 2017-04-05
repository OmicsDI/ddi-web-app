import { TestBed, inject } from '@angular/core/testing';

import { EnrichmentService } from './enrichment.service';

describe('EnrichmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrichmentService]
    });
  });

  it('should ...', inject([EnrichmentService], (service: EnrichmentService) => {
    expect(service).toBeTruthy();
  }));
});
