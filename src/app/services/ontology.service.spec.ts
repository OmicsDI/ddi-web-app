import {inject, TestBed} from '@angular/core/testing';

import {OntologyService} from './ontology.service';

describe('OntologyService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OntologyService]
        });
    });

    it('should ...', inject([OntologyService], (service: OntologyService) => {
        expect(service).toBeTruthy();
    }));
});
