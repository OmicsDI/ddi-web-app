import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SearchService} from 'services/search.service';
import {InviteComponent} from 'search/invite/invite.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isLoaded = {
        hotwords: false,
        tissues: false,
        repos_omics: false,
        latest_datasets: false,
        most_accessed: false,
        annual_omicstype: false,
        statistics: false
    };

    constructor(private loadingBarService: SlimLoadingBarService
        , private searchService: SearchService
        , private dialog: MatDialog
    ) {
        this.loadingBarService.start();
    }

    ngOnInit() {
        this.searchService.fullQuery = '';
        this.searchService.callSearch();
    }

    loadOnePart($partName): void {

        this.isLoaded[$partName] = true;

        for (const item in this.isLoaded) {
            if (!this.isLoaded[item]) {
                return;
            }
        }
        this.loadingBarService.complete();
    }

    submitTestQuery() {
        alert('submitted');
    }

    private showWelcomeDialog() {
        let dialogRef: MatDialogRef<InviteComponent>;

        dialogRef = this.dialog.open(InviteComponent, {
            data: {
                inviteId: '000deace5d6a'
                , userName: 'Hello World'
                , email: 'hello@world.com'
            }
        });
    }

}
