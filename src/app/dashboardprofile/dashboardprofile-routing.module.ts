import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardProfileComponent} from "../pages/dashboard/profile/profile.component";
import {AuthGuardService} from "../services/auth-guard.service";

const routes: Routes = [
    { path: '', component: DashboardProfileComponent , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardprofileRoutingModule { }
