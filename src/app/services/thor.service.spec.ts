import {inject, TestBed} from '@angular/core/testing';

import {ThorService} from './thor.service';

describe('ThorService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThorService]
        });
    });

    it('should be created', inject([ThorService], (service: ThorService) => {
        expect(service).toBeTruthy();
    }));
});
