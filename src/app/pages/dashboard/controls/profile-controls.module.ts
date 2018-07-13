import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClaimOrcidComponent} from 'pages/dashboard/controls/claim-orcid/claim-orcid.component';
import {InviteComponent} from 'pages/dashboard/controls/invite/invite.component';
import {ProfileCoauthorsComponent} from 'pages/dashboard/controls/profile-coauthors/profile-coauthors.component';
import {ProfileConnectionsComponent} from 'pages/dashboard/controls/profile-connections/profile-connections.component';
import {ProfileContactsComponent} from 'pages/dashboard/controls/profile-contacts/profile-contacts.component';
import {ProfileInfoComponent} from 'pages/dashboard/controls/profile-info/profile-info.component';
import {ProfileResultComponent} from 'pages/dashboard/controls/profile-result/profile-result.component';
import {ProfileTotalComponent} from 'pages/dashboard/controls/profile-total/profile-total.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ControlsModule} from 'controls/controls.module';
import {ProfileControlsRoutingModule} from 'pages/dashboard/controls/profile-controls-routing.module';
import {MatCheckboxModule} from '@angular/material';
import {UiSwitchModule} from 'angular2-ui-switch';
import {PipesModule} from '../../../pipes/pipes.module';
import {PagesModule} from 'pages/pages.module';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      NgxPaginationModule,
      ProfileControlsRoutingModule,
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
export class ProfileControlsModule { }
