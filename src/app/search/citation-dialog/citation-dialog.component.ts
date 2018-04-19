import { Component, OnInit } from '@angular/core';
import {DataSetDetail} from "../../model/DataSetDetail";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-citation-dialog',
  templateUrl: './citation-dialog.component.html',
  styleUrls: ['./citation-dialog.component.css']
})
export class CitationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CitationDialogComponent>) { }

  public title: string;
  public messageAPA: string;
  public messageAMA: string;
  public datasetDetail:DataSetDetail;

  /**************************************************************************
  APA style:

  [dataset] Chen, Z., Durley, R., Davidson, V.L., Mathews, F.S. (2015).

  Structural comparison of the oxidized ternary electron transfer complex of methylamine dehydrogenase, amicyanin and cytochrome c551i from Paracoccus denitrificans with the substrate-reduced, copper free complex at 1.9 A resolution, Protein Data Bank, V1. http://identifiers.org/pdb:2gc4.

*** Some notes here: In bold the Name of the Database or Provider. Also the version. For now all of our versions will be V1 until we start controlling the versioning.

  AMA style:
  [dataset] 27. Chen Z, Durley R, Davidson VL, Mathews FS. Structural comparison of the oxidized ternary electron transfer complex of methylamine dehydrogenase, amicyanin and cytochrome c551i from Paracoccus denitrificans with the substrate-reduced, copper free complex at 1.9 A resolution, Protein Data Bank, V1; 2006. http://identifiers.org/pdb:2gc4.
  ***********************************************************************/

  ngOnInit() {
    var p: string = "[dataset] ";
    var m: string = "[dataset] ";
    var i: number = 0;


    var submitters = "";
    if(this.datasetDetail.submitter) {
      for (var s of this.datasetDetail.submitter) {
        i++;
        if (i < 10) {
          submitters += (submitters == "" ? "" : ",") + s;
        } else if ((i < this.datasetDetail.submitter.length) && (!submitters.endsWith("..."))) {
          submitters + ",..."
        }
      }
    }

    p+=submitters;
    m+=submitters;

    var publicationDate = new Date(this.datasetDetail.publicationDate);

    p+= " (" + publicationDate.getFullYear() +"). ";
    m += ". ";

    p += this.datasetDetail.name + ", ";
    m += this.datasetDetail.name + ", ";

    p += this.datasetDetail.source + ", V1.";
    m += this.datasetDetail.source + ", V1; " + publicationDate.getFullYear() + ".";

    /****r += " ";
    if(null!=this.datasetDetail.organization && this.datasetDetail.organization.length > 0) {
      r += this.datasetDetail.organization[0];
    }
    r += ". ";
    r += this.datasetDetail.publicationDate;****/

    p += " " + this.datasetDetail.full_dataset_link + ".";
    m += " " + this.datasetDetail.full_dataset_link + ".";

    this.messageAPA = p;
    this.messageAMA = m;
  }

  Pselected: boolean;
  Pcopied: boolean;
  Mselected: boolean;
  Mcopied: boolean;

  mouseOverP(event) {
    event.target.style = "border:solid 1px black;";
    this.Pselected = true;
  }

  mouseOutP(event){
    event.target.style = "border:none";
    this.Pselected = false;
  }

  mouseClickP(event){
    this.Pcopied = true;
    this.Mcopied = false;
  }

  mouseOverM(event) {
    event.target.style = "border:solid 1px black;";
    this.Mselected = true;
  }

  mouseOutM(event){
    event.target.style = "border:none";
    this.Mselected = false;
  }

  mouseClickM(event){
    this.Mcopied = true;
    this.Pcopied = false;
  }

}
