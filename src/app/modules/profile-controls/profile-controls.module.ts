import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClaimOrcidComponent} from './claim-orcid/claim-orcid.component';
import {InviteComponent} from './invite/invite.component';
import {ProfileCoauthorsComponent} from './profile-coauthors/profile-coauthors.component';
import {ProfileConnectionsComponent} from './profile-connections/profile-connections.component';
import {ProfileContactsComponent} from './profile-contacts/profile-contacts.component';
import {ProfileInfoComponent} from './profile-info/profile-info.component';
import {ProfileResultComponent} from './profile-result/profile-result.component';
import {ProfileTotalComponent} from './profile-total/profile-total.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ControlsModule} from 'controls/controls.module';
import {MatCheckboxModule} from '@angular/material';
import {UiSwitchModule} from 'angular2-ui-switch';
import {PipesModule} from 'app/pipes/pipes.module';
import {PagesModule} from 'pages/pages.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxPaginationModule,
        MatCheckboxModule,
        UiSwitchModule,
        PipesModule,
        PagesModule,
        ControlsModule
    ],
    declarations: [
        ClaimOrcidComponent,
        InviteComponent,
        ProfileCoauthorsComponent,
        ProfileConnectionsComponent,
        ProfileContactsComponent,
        ProfileInfoComponent,
        ProfileResultComponent,
        ProfileTotalComponent
    ],
    exports: [
        ClaimOrcidComponent,
        InviteComponent,
        ProfileCoauthorsComponent,
        ProfileConnectionsComponent,
        ProfileContactsComponent,
        ProfileInfoComponent,
        ProfileResultComponent,
        ProfileTotalComponent
    ]
})
export class ProfileControlsModule {
}
