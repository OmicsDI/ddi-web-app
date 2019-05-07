import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-single-input-dialog',
    templateUrl: './single-input-dialog.component.html',
    styleUrls: ['./single-input-dialog.component.css']
})
export class SingleInputDialogComponent {

    public title: string;
    public inputVal: string;

    constructor(public dialogRef: MatDialogRef<SingleInputDialogComponent>) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
