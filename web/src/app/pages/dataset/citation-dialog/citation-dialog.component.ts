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
  public message: string;
  public datasetDetail:DataSetDetail;

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
    this.message = r;
  }

}
