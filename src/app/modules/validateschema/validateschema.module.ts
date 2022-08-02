import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidateschemaRoutingModule } from './validateschema-routing.module';
import { ValidateschemaComponent } from './validateschema/validateschema.component';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [ValidateschemaComponent],
  imports: [
    CommonModule,
    ValidateschemaRoutingModule,
    MatIconModule,
    MatProgressBarModule
  ],
  bootstrap:[ValidateschemaComponent]
})
export class ValidateschemaModule { }
