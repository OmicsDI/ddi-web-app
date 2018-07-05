import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from 'pages/dashboard/dashboard.component';
import {AuthGuardService} from 'services/auth-guard.service';

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
