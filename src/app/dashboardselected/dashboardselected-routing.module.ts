import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardSelectedComponent} from 'pages/dashboard/selected/selected.component';
import {AuthGuardService} from 'services/auth-guard.service';

const routes: Routes = [{
    path: '', component: DashboardSelectedComponent, canActivate: [AuthGuardService]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardselectedRoutingModule {
}
