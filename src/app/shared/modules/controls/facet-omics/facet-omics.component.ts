import {Component} from '@angular/core';
import {FacetComponent} from '../facet/facet.component';

@Component({
    selector: 'app-facet-omics',
    templateUrl: './facet-omics.component.html',
    styleUrls: ['./facet-omics.component.css']
})
export class FacetOmicsComponent extends FacetComponent {

    constructor() {
        super();
    }

}
