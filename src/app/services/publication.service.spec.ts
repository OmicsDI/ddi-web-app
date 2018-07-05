import {inject, TestBed} from '@angular/core/testing';
import {PublicationService} from './publication.service';

describe('PublicationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PublicationService]
        });
    });

    it('should ...', inject([PublicationService], (service: PublicationService) => {
        expect(service).toBeTruthy();
    }));
});
