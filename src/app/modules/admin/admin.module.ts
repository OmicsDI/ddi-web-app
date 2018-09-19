import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from '@modules/admin/components/admin/admin.component';
import {ProfileContactsComponent} from './components/profile-contacts/profile-contacts.component';
import {UtilsModule} from '@shared/modules/utils/utils.module';

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        ProfileContactsComponent
    ]
})

export class AdminModule {
}
