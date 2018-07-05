import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from 'pages/dashboard/settings/settings.component';
import {AuthGuardService} from 'services/auth-guard.service';

const routes: Routes = [{
    path: '', component: SettingsComponent, canActivate: [AuthGuardService]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsettingsRoutingModule {
}
