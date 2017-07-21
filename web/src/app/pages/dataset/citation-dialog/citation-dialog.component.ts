import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {DataSetDetail} from "../../../model/DataSetDetail";

@Component({
  selector: 'app-citation-dialog',
  templateUrl: './citation-dialog.component.html',
  styleUrls: ['./citation-dialog.component.css']
})
export class CitationDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CitationDialogComponent>) { }

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
    var r: string = "";
    var i: number = 0;
    for (var s of this.datasetDetail.submitter) {
      i++;
      if(i<10) {
        r += (r == "" ? "" : ",") + s;
      }else if ((i<this.datasetDetail.submitter.length) && (!r.endsWith("..."))) {
        r + ",..."
      }
    }
    r += ". ";
    r += this.datasetDetail.name;
    r += " ";
    if(null!=this.datasetDetail.organization && this.datasetDetail.organization.length > 0) {
      r += this.datasetDetail.organization[0];
    }
    r += ". ";
    r += this.datasetDetail.publicationDate;
    this.messageAPA = r;
    this.messageAMA = r;
  }

}
