import { TestBed, inject } from '@angular/core/testing';

import { JsonLdService } from './json-ld.service';

describe('JsonLdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonLdService]
    });
  });

  it('should be created', inject([JsonLdService], (service: JsonLdService) => {
    expect(service).toBeTruthy();
  }));
});
