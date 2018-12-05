import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '@modules/home/components/home/home.component';
import {UnauthorizedComponent} from '@modules/commonplace/components/unauthorized/unauthorized.component';
import {TermsComponent} from '@modules/commonplace/components/terms/terms.component';
import {NotfoundComponent} from '@modules/commonplace/components/notfound/notfound.component';
import {AuthService} from '@shared/services/auth.service';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile/:username', loadChildren: '@modules/profile/profile.module#ProfileModule'},
    {path: 'database', loadChildren: '@modules/database/database.module#DatabaseModule'},
    {path: 'databases', loadChildren: '@modules/database/database.module#DatabaseModule'},
    {path: 'help', loadChildren: '@modules/help/help.module#HelpModule'},
    {path: 'about', loadChildren: '@modules/help/help.module#HelpModule'},
    {path: 'search', loadChildren: '@modules/search/search.module#SearchModule' },
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'dataset/:domain/:acc', loadChildren: '@modules/dataset/dataset.module#DatasetModule'},
    {path: 'terms', component: TermsComponent},
    {path: 'notfound', component: NotfoundComponent},
    {path: 'admin', loadChildren: '@modules/admin/admin.module#AdminModule', canActivate: [AuthService]},
    {path: 'dashboard', loadChildren: '@modules/dashboard/dashboard.module#DashboardModule', canActivate: [AuthService]},
    {path: '**', component: NotfoundComponent}
    // { path: 'welcome/:inviteId', component: WelcomeComponent },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {initialNavigation: 'enabled'});
