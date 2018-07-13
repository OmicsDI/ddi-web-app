import {Component} from '@angular/core';
import {FacetComponent} from '../facet/facet.component';
import {SearchService} from 'services/search.service';

@Component({
    selector: 'app-facet-omics',
    templateUrl: './facet-omics.component.html',
    styleUrls: ['./facet-omics.component.css']
})
export class FacetOmicsComponent extends FacetComponent {

    constructor(searchService: SearchService) {
        super(searchService);
    }

}
