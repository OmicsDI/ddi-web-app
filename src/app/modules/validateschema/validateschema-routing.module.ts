import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ValidateschemaComponent} from "@modules/validateschema/validateschema/validateschema.component";

const routes: Routes = [{
    path: '',
    component: ValidateschemaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateschemaRoutingModule { }
