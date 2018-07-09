import {NgModule} from '@angular/core';
import {SearchQueryComponent} from 'pages/search/search-query/search-query.component';
import {ProfileRepoOmicsComponent} from 'pages/profile/charts/profile-repo-omics/profile-repo-omics.component';
import {ProfileAnnualOmicstypeComponent} from 'pages/profile/charts/profile-annual-omicstype/profile-annual-omicstype.component';
import {ProfileTotalComponent} from 'pages/dashboard/controls/profile-total/profile-total.component';
import {ProfileCoauthorsComponent} from 'pages/dashboard/controls/profile-coauthors/profile-coauthors.component';
import {CheckComponent} from 'pages/check/check.component';
import {InviteComponent} from 'pages/dashboard/controls/invite/invite.component';
import {WelcomeComponent} from 'pages/welcome/welcome.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ControlsModule} from 'controls/controls.module';
import {RouterModule} from '@angular/router';
import {MatCheckboxModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        ControlsModule,
        RouterModule
    ],
    declarations: [
        InviteComponent,
        CheckComponent,
        ProfileCoauthorsComponent,
        ProfileTotalComponent,
        ProfileAnnualOmicstypeComponent,
        ProfileRepoOmicsComponent,
        SearchQueryComponent,
        WelcomeComponent
    ]
})
export class PagesModule {
}
