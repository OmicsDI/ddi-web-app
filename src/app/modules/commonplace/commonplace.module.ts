import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminComponent} from '@modules/admin/components/admin/admin.component';
import {CheckComponent} from '@modules/commonplace/components/check/check.component';
import {NotfoundComponent} from '@modules/commonplace/components/notfound/notfound.component';
import {SelectedComponent} from '@modules/commonplace/components/selected/selected.component';
import {TermsComponent} from '@modules/commonplace/components/terms/terms.component';
import {UnauthorizedComponent} from '@modules/commonplace/components/unauthorized/unauthorized.component';
import {WelcomeComponent} from '@modules/commonplace/components/welcome/welcome.component';
import {PipesModule} from '../../pipes/pipes.module';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {UtilsModule} from 'utils/utils.module';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material';
import {ControlsModule} from 'controls/controls.module';
import {ProfileControlsModule} from '@modules/profile-controls/profile-controls.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCheckboxModule,
        ControlsModule,
        RouterModule,
        UtilsModule,
        PipesModule,
        ClipboardModule,
        ProfileControlsModule,
        NgxPaginationModule
    ],
    declarations: [
        AdminComponent,
        CheckComponent,
        NotfoundComponent,
        SelectedComponent,
        TermsComponent,
        UnauthorizedComponent,
        WelcomeComponent
    ]
})

export class CommonplaceModule {
}
