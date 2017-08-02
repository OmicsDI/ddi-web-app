/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SimilarityService } from './similarity.service';

describe('SimilarityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimilarityService]
    });
  });

  it('should ...', inject([SimilarityService], (service: SimilarityService) => {
    expect(service).toBeTruthy();
  }));
});
