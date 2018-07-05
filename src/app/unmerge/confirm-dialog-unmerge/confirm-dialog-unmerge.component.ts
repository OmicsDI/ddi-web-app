import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-confirm-dialog-merge',
    templateUrl: './confirm-dialog-unmerge.component.html',
    styleUrls: ['./confirm-dialog-unmerge.component.css']
})
export class ConfirmDialogUnmergeComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogUnmergeComponent>) {

    }
}
