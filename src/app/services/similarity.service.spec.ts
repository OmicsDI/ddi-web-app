import {inject, TestBed} from '@angular/core/testing';
import {SimilarityService} from './similarity.service';

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
