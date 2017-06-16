import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-omics-image',
  templateUrl: './omics-image.component.html',
  styleUrls: ['./omics-image.component.css']
})
export class OmicsImageComponent implements OnInit {

  @Input() omics: string[];
  @Input() size: string;
  width: string = "";
  length: string = "";

  constructor() { }

  ngOnInit() {
    if (this.size=="small"){
      this.width="15px";
      this.length="15px";
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
    else
      this.omicsImage = "img/omics/Unknomics2.png";

    if(this.size=="large"){
      this.omicsImage = this.omicsImage.replace("2.png",".png");
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
