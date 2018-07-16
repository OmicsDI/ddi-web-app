import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from 'pages/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {UnauthorizedComponent} from 'pages/unauthorized/unauthorized.component';
import {NotfoundComponent} from 'pages/notfound/notfound.component';
import {TermsComponent} from 'pages/terms/terms.component';
import {SelectedComponent} from 'pages/selected/selected.component';
import {AuthGuardService} from 'services/auth-guard.service';

// Route Configuration
export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    // { path: 'profile', redirectTo:'dashboard/profile'},
    {path: 'profile/:username', loadChildren: './profile/profile.module#ProfileModule'},
    {path: 'database', loadChildren: './database/database.module#DatabaseModule'},
    {path: 'help', loadChildren: '@modules/help/help.module#HelpModule'},
    {path: 'search', loadChildren: './search/search.module#SearchModule' },
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'dataset/:domain/:acc', loadChildren: '@modules/dataset/dataset.module#DatasetModule'},
    {path: 'terms', component: TermsComponent},
    {path: 'notfound', component: NotfoundComponent},
    {path: 'admin', loadChildren: '@modules/admin/admin.module#AdminModule'},
    {path: 'selected', component: SelectedComponent},
    {path: 'merge', loadChildren: './merge/merge.module#MergeModule' , canActivate: [AuthGuardService]},
    {path: 'unmerge', loadChildren: './unmerge/unmerge.module#UnmergeModule', canActivate: [AuthGuardService]},
    {path: 'dashboard', loadChildren: '@modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuardService]}
    // { path: 'welcome/:inviteId', component: WelcomeComponent },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
