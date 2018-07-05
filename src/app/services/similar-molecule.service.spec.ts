import {inject, TestBed} from '@angular/core/testing';

import {SimilarMoleculeService} from './similar-molecule.service';

describe('SimilarMoleculeService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SimilarMoleculeService]
        });
    });

    it('should ...', inject([SimilarMoleculeService], (service: SimilarMoleculeService) => {
        expect(service).toBeTruthy();
    }));
});
