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
  @Input() ids: string[] = new Array();
  d: Publication = new Publication;
  subscription: Subscription;
  current_idx: number = 0;
  ids_length: string = "";

  constructor(private publicationService: PublicationService) {
    this.subscription = this.publicationService.searchResult$.subscribe(
      result => {
        this.d = result.publications[0];
        console.log(this.d)
      });
  }

  ngOnInit() {
  }

  ngOnChanges(...args: any[]) {
    console.log('onChange fired');
    console.log('changing', args);

    if(this.ids != null)
      if(this.ids.length > 0)
      {
        this.loadComponent();
      }
  }

  loadComponent(){
    this.current_idx = 0;
    this.publicationService.search(this.ids[this.current_idx]);
    this.ids_length = String(this.ids.length);
  }

  clickLeft(){
    if(this.current_idx == 0){
      this.current_idx = this.ids.length - 1;
    }else{
      this.current_idx = this.current_idx - 1;
    }
    this.publicationService.search(this.ids[this.current_idx]);
  }

  clickRight(){
    if(this.current_idx == this.ids.length - 1){
      this.current_idx = 0;
    }else{
      this.current_idx = this.current_idx + 1;
    }
    this.publicationService.search(this.ids[this.current_idx]);
  }

}
