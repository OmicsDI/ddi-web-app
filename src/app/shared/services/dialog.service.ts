import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ConfirmDialogComponent} from '@shared/modules/controls/confirm-dialog/confirm-dialog.component';
import {SingleInputDialogComponent} from '@shared/modules/controls/single-input-dialog/single-input-dialog.component';

@Injectable()
export class DialogService {
    constructor(private dialog: MatDialog) {
    }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmDialogComponent>;

        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public singleInputDialog(title: string): Observable<string> {
        let dialogRef: MatDialogRef<SingleInputDialogComponent>;
        dialogRef = this.dialog.open(SingleInputDialogComponent);
        dialogRef.componentInstance.title = title;
        return dialogRef.afterClosed();
    }
}
