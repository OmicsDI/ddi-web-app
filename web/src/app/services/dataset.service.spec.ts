/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatasetService } from './dataset.service';

describe('DatasetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatasetService]
    });
  });

  it('should ...', inject([DatasetService], (service: DatasetService) => {
    expect(service).toBeTruthy();
  }));
});
