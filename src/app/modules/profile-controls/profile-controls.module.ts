import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClaimOrcidComponent} from './components/claim-orcid/claim-orcid.component';
import {InviteComponent} from './components/invite/invite.component';
import {ProfileCoauthorsComponent} from './components/profile-coauthors/profile-coauthors.component';
import {ProfileConnectionsComponent} from './components/profile-connections/profile-connections.component';
import {ProfileContactsComponent} from './components/profile-contacts/profile-contacts.component';
import {ProfileInfoComponent} from './components/profile-info/profile-info.component';
import {ProfileResultComponent} from './components/profile-result/profile-result.component';
import {ProfileTotalComponent} from './components/profile-total/profile-total.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ControlsModule} from '@shared/modules/controls/controls.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {PipesModule} from '@shared/pipes/pipes.module';
import {RouterModule} from '@angular/router';
import {UtilsModule} from '@shared/modules/utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgxPaginationModule,
        MatCheckboxModule,
        PipesModule,
        UtilsModule,
        ControlsModule,
        MatSlideToggleModule
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
