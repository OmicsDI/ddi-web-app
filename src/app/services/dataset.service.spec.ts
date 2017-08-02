/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataSetService } from './dataset.service';

describe('DataSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSetService]
    });
  });

  it('should ...', inject([DataSetService], (service: DataSetService) => {
    expect(service).toBeTruthy();
  }));
});
