import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UnmergeComponent} from "../pages/unmerge/unmerge.component";

const routes: Routes = [{
    path:'',
    component: UnmergeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnmergeRoutingModule { }
