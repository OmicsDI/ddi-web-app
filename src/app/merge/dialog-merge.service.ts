import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ConfirmDialogMergeComponent} from "./confirm-dialog-merge/confirm-dialog-merge.component";

@Injectable()
export class DialogServiceMerge {
  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogMergeComponent>;

    dialogRef = this.dialog.open(ConfirmDialogMergeComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
