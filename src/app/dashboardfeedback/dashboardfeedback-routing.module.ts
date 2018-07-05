import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardFeedbackComponent} from "../pages/dashboard/feedback/feedback.component";
import {AuthGuardService} from "../services/auth-guard.service";

const routes: Routes = [{
  path: '', component: DashboardFeedbackComponent , canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardfeedbackRoutingModule { }
