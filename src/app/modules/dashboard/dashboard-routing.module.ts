import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardSelectedComponent} from '@modules/dashboard/components/selected/selected.component';
import {DashboardFeedbackComponent} from '@modules/dashboard/components/feedback/feedback.component';
import {DashboardProfileComponent} from '@modules/dashboard/components/profile/profile.component';
import {DashboardUpdateComponent} from '@modules/dashboard/components/update/update.component';
import {DashboardClaimedComponent} from '@modules/dashboard/components/claimed/claimed.component';
import {SettingsComponent} from '@modules/dashboard/components/settings/settings.component';
import {DashboardComponent} from '@modules/dashboard/components/dashboard/dashboard.component';
import {NavComponent} from '@modules/dashboard/components/nav/nav.component';
import {MergeComponent} from '@modules/dashboard/components/merge/merge.component';
import {UnmergeComponent} from '@modules/dashboard/components/unmerge/unmerge.component';

const routes: Routes = [
    {
        path: '', component: NavComponent, children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'selected', component: DashboardSelectedComponent},
            {path: 'feedback', component: DashboardFeedbackComponent},
            {path: 'profile', component: DashboardProfileComponent},
            {path: 'update', component: DashboardUpdateComponent},
            {path: 'claimed', component: DashboardClaimedComponent},
            {path: 'settings', component: SettingsComponent},
            {path: 'merge', component: MergeComponent},
            {path: 'unmerge', component: UnmergeComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
