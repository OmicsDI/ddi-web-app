import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {SearchResult} from 'model/SearchResult';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DataSetService} from '@shared/services/dataset.service';
import {CitationDialogComponent} from '@shared/modules/controls/citation-dialog/citation-dialog.component';
import {DataControl} from 'model/DataControl';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    @Input()
    searchResult: SearchResult;

    @Input()
    totalResults: number;

    @Input()
    dataControl: DataControl;

    constructor(private dataSetService: DataSetService, private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    citation(source, id) {
        let dialogRef: MatDialogRef<CitationDialogComponent>;

        this.dataSetService.getDataSetDetail_private(id, source).subscribe(
            x => {
                dialogRef = this.dialog.open(CitationDialogComponent);
                dialogRef.componentInstance.title = 'Dataset citation';
                dialogRef.componentInstance.datasetDetail = x;
                return dialogRef.afterClosed();
            }
        );
    }


}
