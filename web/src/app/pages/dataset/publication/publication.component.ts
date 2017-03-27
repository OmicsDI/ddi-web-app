import {Component, OnInit, Input} from '@angular/core';
import {PublicationService} from "../../../services/publication.service";
import {Subscription} from "rxjs";
import {Publication} from "../../../model/Publication";

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  @Input() Id: string;
  d: Publication;
  subscription: Subscription;

  constructor(private publicationService: PublicationService) {
    this.subscription = this.publicationService.searchResult$.subscribe(
      result => {
        this.d = result.publications[0];
      });
  }

  ngOnInit() {
  }

}
