// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {ProfileComponent} from "./pages/profile/profile.component";
// import {DatabaseComponent} from "./pages/database/database.component";
import {HomeComponent} from 'pages/home/home.component';
// import {ApiComponent} from "./pages/api/api.component";
import {SearchComponent} from 'pages/search/search.component';
import {UnauthorizedComponent} from 'pages/unauthorized/unauthorized.component';
// import {DatasetComponent} from "./pages/dataset/dataset.component";
// import {TermsComponent} from "./pages/terms/terms.component";
import {NotfoundComponent} from 'pages/notfound/notfound.component';
// import {AdminComponent} from "./pages/admin/admin.component";
// import {SelectedComponent} from "./pages/selected/selected.component";
// import {DashboardComponent} from "./pages/dashboard/dashboard.component";
// import {DashboardSelectedComponent} from "./pages/dashboard/selected/selected.component";
// import {DashboardFeedbackComponent} from "./pages/dashboard/feedback/feedback.component";
// import {DashboardProfileComponent} from "./pages/dashboard/profile/profile.component";
// import {DashboardUpdateComponent} from "./pages/dashboard/update/update.component";
// import {DashboardClaimedComponent} from "./pages/dashboard/claimed/claimed.component";
// import {DashboardPictureComponent} from "./pages/dashboard/picture/picture.component";
// import {SettingsComponent} from "./pages/dashboard/settings/settings.component";
import {TermsComponent} from 'pages/terms/terms.component';
import {SelectedComponent} from 'pages/selected/selected.component';

// Route Configuration
export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {path: 'home', component: HomeComponent},
    // { path: 'profile', redirectTo:'dashboard/profile'},
    {path: 'profile/:username', loadChildren: './profile/profile.module#ProfileModule'},
    {path: 'database', loadChildren: './database/database.module#DatabaseModule'},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: 'api', loadChildren: './api/api.module#ApiModule'},
    // { path: 'search', loadChildren: './search/search.module#SearchModule' },
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'dataset/:domain/:acc', loadChildren: './dataset/dataset.module#DatasetModule'},
    // { path: 'search', loadChildren: () => SearchModule },
    {path: 'search', component: SearchComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'notfound', component: NotfoundComponent},
    {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    {path: 'selected', component: SelectedComponent},
    {path: 'merge', loadChildren: './merge/merge.module#MergeModule'},
    {path: 'unmerge', loadChildren: './unmerge/unmerge.module#UnmergeModule'},
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
    {path: 'dashboard/selected', loadChildren: './dashboardselected/dashboardselected.module#DashboardselectedModule'},
    {path: 'dashboard/feedback', loadChildren: './dashboardfeedback/dashboardfeedback.module#DashboardfeedbackModule'},
    {path: 'dashboard/profile', loadChildren: './dashboardprofile/dashboardprofile.module#DashboardprofileModule'},
    {path: 'dashboard/update', loadChildren: './dashboardupdate/dashboardupdate.module#DashboardupdateModule'},
    {path: 'dashboard/claimed', loadChildren: './dashboardclaimed/dashboardclaimed.module#DashboardclaimedModule'},
    {path: 'dashboard/picture', loadChildren: './dashboardpicture/dashboardpicture.module#DashboardpictureModule'},
    {path: 'dashboard/settings', loadChildren: './dashboardsettings/dashboardsettings.module#DashboardsettingsModule'}
    // { path: 'welcome/:inviteId', component: WelcomeComponent },

];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: false});
