import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from "../services/auth-guard.service";
import {DashboardPictureComponent} from "../pages/dashboard/picture/picture.component";

const routes: Routes = [{
  path: '' , component: DashboardPictureComponent , canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardpictureRoutingModule { }
