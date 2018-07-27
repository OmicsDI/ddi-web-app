import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DatabaseRoutingModule} from './database-routing.module';
import {DatabaseComponent} from './components/database/database.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        NgxPaginationModule,
        DatabaseRoutingModule
    ],
    declarations: [
        DatabaseComponent
    ],
    bootstrap: [DatabaseComponent]
})
export class DatabaseModule {
}
