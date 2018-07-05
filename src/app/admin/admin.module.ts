import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from "../pages/admin/admin.component";
import {ProfileContactsComponent} from "./profile-contacts/profile-contacts.component";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
      AdminComponent,
      ProfileContactsComponent
  ],
    bootstrap: [AdminComponent]
})
export class AdminModule { }
