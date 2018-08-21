import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardSelectedComponent} from '@modules/dashboard/components/selected/selected.component';
import {DashboardFeedbackComponent} from '@modules/dashboard/components/feedback/feedback.component';
import {DashboardProfileComponent} from '@modules/dashboard/components/profile/profile.component';
import {DashboardUpdateComponent} from '@modules/dashboard/components/update/update.component';
import {DashboardClaimedComponent} from '@modules/dashboard/components/claimed/claimed.component';
import {DashboardPictureComponent} from '@modules/dashboard/components/picture/picture.component';
import {SettingsComponent} from '@modules/dashboard/components/settings/settings.component';
import {DashboardComponent} from '@modules/dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'selected', component: DashboardSelectedComponent},
    {path: 'feedback', component: DashboardFeedbackComponent},
    {path: 'profile', component: DashboardProfileComponent},
    {path: 'update', component: DashboardUpdateComponent},
    {path: 'claimed', component: DashboardClaimedComponent},
    {path: 'picture', component: DashboardPictureComponent},
    {path: 'settings', component: SettingsComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
