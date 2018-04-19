import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MergeRoutingModule } from './merge-routing.module';
import {MergeComponent} from "../pages/merge/merge.component";

@NgModule({
  imports: [
    CommonModule,
    MergeRoutingModule
  ],
  declarations: [
      MergeComponent
  ]
})
export class MergeModule { }
