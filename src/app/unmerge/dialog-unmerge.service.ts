import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {Observable} from "rxjs/Observable";
import {ConfirmDialogUnmergeComponent} from "./confirm-dialog-unmerge/confirm-dialog-unmerge.component";

@Injectable()
export class DialogUnmergeService {
  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<ConfirmDialogUnmergeComponent>;

    dialogRef = this.dialog.open(ConfirmDialogUnmergeComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
