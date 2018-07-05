import {Component, OnInit, Input, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-omics-image-search',
  templateUrl: './omics-image-search.component.html',
  styleUrls: ['./omics-image-search.component.css']
})
export class OmicsImageSearchComponent implements OnInit {

  @Input() omics: string[];
  @Input() size: string;
  width: string = "";
  height: string = "";

  constructor() { }

  ngOnInit() {
  }

  calculateOmics(){
    if (this.size=="small"){
      this.width="15px";
      this.height="15px";
    }

    if(!this.omics){
      if(this.size=="large"){
        this.omicsImage = "img/omics/Unknomics.png";
      }
      return;
    }

    if(this.omics.indexOf('Multiomics') != -1)
      this.omicsImage = "img/omics/Multipleomics2.png";
    else if(this.omics.indexOf('Proteomics') != -1)
      this.omicsImage = "img/omics/Proteomics2.png";
    else if(this.omics.indexOf('Transcriptomics') != -1)
      this.omicsImage = "img/omics/Transcriptomics2.png";
    else if(this.omics.indexOf('Metabolomics') != -1)
      this.omicsImage = "img/omics/Metabolomics2.png";
    else if(this.omics.indexOf('Genomics') != -1)
      this.omicsImage = "img/omics/Genomics2.png";
    else if(this.omics.indexOf('Models') != -1)
      this.omicsImage = "img/omics/BioModel2.png";
    else
      this.omicsImage = "img/omics/Unknomics2.png";

    if(this.size=="large"){
      this.omicsImage = this.omicsImage.replace("2.png",".png");
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      if(propName=="omics"){
        if(null!=changes[propName].currentValue){
          this.calculateOmics();
        }
      }
    }
  }

  omicsImage: string = "img/omics/Unknomics2.png";

  omicsList(): string{
    if(!this.omics) {
      return "no omics defined";
    }
    else {
      return this.omics.join(",");
    }
  }

}
