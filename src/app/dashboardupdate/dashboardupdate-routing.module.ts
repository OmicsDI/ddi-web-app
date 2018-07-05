import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardUpdateComponent} from 'pages/dashboard/update/update.component';
import {AuthGuardService} from 'services/auth-guard.service';

const routes: Routes = [{
    path: '', component: DashboardUpdateComponent, canActivate: [AuthGuardService]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardupdateRoutingModule {
}
