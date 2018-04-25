import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiRoutingModule } from './api-routing.module';
import {ApiComponent} from "../pages/api/api.component";

@NgModule({
  imports: [
    CommonModule,
    ApiRoutingModule
  ],
  declarations: [
      ApiComponent
  ],
    bootstrap: [ApiComponent]
})
export class ApiModule { }
