import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MergeRoutingModule } from './merge-routing.module';
import {MergeComponent} from "../pages/merge/merge.component";
import {NgxPaginationModule} from "ngx-pagination";
import {ConfirmDialogMergeComponent} from "./confirm-dialog-merge/confirm-dialog-merge.component";
import {MatDialogModule} from "@angular/material";
import {DialogServiceMerge} from "./dialog-merge.service";

@NgModule({
  imports: [
    CommonModule,
    MergeRoutingModule,
      NgxPaginationModule,
      MatDialogModule
  ],
  declarations: [
      MergeComponent,
      ConfirmDialogMergeComponent
  ],
    entryComponents: [
        ConfirmDialogMergeComponent
    ],
    providers: [
        DialogServiceMerge
    ],
    bootstrap: [MergeComponent]
})
export class MergeModule { }
