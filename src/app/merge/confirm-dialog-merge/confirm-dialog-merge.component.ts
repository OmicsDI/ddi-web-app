import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirm-dialog-merge',
  templateUrl: './confirm-dialog-merge.component.html',
  styleUrls: ['./confirm-dialog-merge.component.css']
})
export class ConfirmDialogMergeComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogMergeComponent>) {

  }
}
