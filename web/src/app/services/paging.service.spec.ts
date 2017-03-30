import { TestBed, inject } from '@angular/core/testing';

import { PagingService } from './paging.service';

describe('PagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagingService]
    });
  });

  it('should ...', inject([PagingService], (service: PagingService) => {
    expect(service).toBeTruthy();
  }));
});
