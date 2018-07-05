import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatabaseComponent} from "../pages/database/database.component";

const routes: Routes = [{
  path:'',
    component: DatabaseComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule { }
