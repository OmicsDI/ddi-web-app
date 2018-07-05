import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {AppConfig} from "../../../app.config";
import {AltmetricService} from "../../../services/altmetric.service";

@Component({
  selector: 'app-altmetric-image-dataset',
  templateUrl: './altmetric-image-dataset.component.html',
  styleUrls: ['./altmetric-image-dataset.component.css']
})
export class AltmetricImageDatasetComponent implements OnInit, OnChanges {

  @Input() PMID: string;
  image_url: string = "static/images/altmetric/altmetric_unknown.png";
  detail_url: string = "";

  constructor(private altmetricService: AltmetricService, private appConfig: AppConfig ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      if(propName=="PMID"){
        if(null!=changes[propName].currentValue){
          let PMID = changes[propName].currentValue;

          this.altmetricService.get(PMID).subscribe(
            result => {this.image_url = result.image_url
                  this.detail_url = result.detail_url;
              }
          );
        }
      }
    }
  }

}
