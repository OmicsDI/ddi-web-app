import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnmergeRoutingModule } from './unmerge-routing.module';
import {NgxPaginationModule} from "ngx-pagination";
import {UnmergeComponent} from "../pages/unmerge/unmerge.component";
import {ConfirmDialogUnmergeComponent} from "./confirm-dialog-unmerge/confirm-dialog-unmerge.component";
import {DialogUnmergeService} from "./dialog-unmerge.service";
import {MatDialogModule} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
      NgxPaginationModule,
    UnmergeRoutingModule,
      MatDialogModule
  ],
  declarations: [
      UnmergeComponent,
      ConfirmDialogUnmergeComponent
  ],
    entryComponents: [
        ConfirmDialogUnmergeComponent
    ],
    providers: [
        DialogUnmergeService
    ],
})
export class UnmergeModule { }
