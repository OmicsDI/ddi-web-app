import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from 'pages/dashboard/dashboard.component';
import {AuthGuardService} from 'services/auth-guard.service';
import {DashboardSelectedComponent} from 'pages/dashboard/selected/selected.component';
import {DashboardFeedbackComponent} from 'pages/dashboard/feedback/feedback.component';
import {DashboardProfileComponent} from 'pages/dashboard/profile/profile.component';
import {DashboardUpdateComponent} from 'pages/dashboard/update/update.component';
import {DashboardClaimedComponent} from 'pages/dashboard/claimed/claimed.component';
import {DashboardPictureComponent} from 'pages/dashboard/picture/picture.component';
import {SettingsComponent} from 'pages/dashboard/settings/settings.component';

const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [AuthGuardService]},
    {
        path: 'selected',
        component: DashboardSelectedComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'feedback',
        component: DashboardFeedbackComponent,
        canActivate: [AuthGuardService]},
    {
        path: 'profile',
        component: DashboardProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'update',
        component: DashboardUpdateComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'claimed',
        component: DashboardClaimedComponent,
        canActivate: [AuthGuardService]},
    {
        path: 'picture',
        component: DashboardPictureComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
