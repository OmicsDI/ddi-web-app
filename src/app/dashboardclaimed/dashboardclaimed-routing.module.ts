import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardClaimedComponent} from 'pages/dashboard/claimed/claimed.component';
import {AuthGuardService} from 'services/auth-guard.service';

const routes: Routes = [{
    path: '', component: DashboardClaimedComponent, canActivate: [AuthGuardService]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardclaimedRoutingModule {
}
