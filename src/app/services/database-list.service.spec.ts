import {inject, TestBed} from '@angular/core/testing';

import {DatabaseListService} from './database-list.service';

describe('DatabaseListService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DatabaseListService]
        });
    });

    it('should ...', inject([DatabaseListService], (service: DatabaseListService) => {
        expect(service).toBeTruthy();
    }));
});
