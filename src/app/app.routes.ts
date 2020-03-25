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
    {path: 'profile/:username', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)},
    {path: 'database', loadChildren: () => import('./modules/database/database.module').then(m => m.DatabaseModule)},
    {path: 'databases', loadChildren: () => import('./modules/database/database.module').then(m => m.DatabaseModule)},
    {path: 'help', loadChildren: () => import('./modules/help/help.module').then(m => m.HelpModule)},
    {path: 'about', loadChildren: () => import('./modules/help/help.module').then(m => m.HelpModule)},
    {path: 'search', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule) },
    {path: 'unauthorized', component: UnauthorizedComponent},
    {path: 'dataset/:domain/:acc', loadChildren: () => import('./modules/dataset/dataset.module').then(m => m.DatasetModule)},
    {path: 'terms', component: TermsComponent},
    {path: 'notfound', component: NotfoundComponent},
    {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthService]},
    {path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module')
            .then(m => m.DashboardModule), canActivate: [AuthService]},
    {path: '**', component: NotfoundComponent}

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {initialNavigation: 'enabled'});
