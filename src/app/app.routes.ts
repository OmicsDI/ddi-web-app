// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProfileComponent} from "./pages/profile/view/profile.component";
import {DatabaseComponent} from "./pages/database/database.component";
import {HomeComponent} from "./pages/home/home.component";
import {ApiComponent} from "./pages/api/api.component";
import {SearchComponent} from "./pages/search/search.component";
import {AboutComponent} from "./pages/about/about.component";
import {UnauthorizedComponent} from "./pages/unauthorized/unauthorized.component";
import { AuthGuardService } from './services/auth-guard.service';
import {DatasetComponent} from "./pages/dataset/dataset.component";
import {TermsComponent} from "./pages/terms/terms.component";
import {ClaimedComponent} from "./pages/profile/claimed/claimed.component";
import {UpdateProfileComponent} from "./pages/profile/update-profile/update-profile.component";
import {ProfileDisqusComponent} from "./pages/profile/profile-disqus/profile-disqus.component";
import {NotfoundComponent} from "./pages/notfound/notfound.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {SelectedComponent} from "./pages/selected/selected.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile/claimed', component: ClaimedComponent, canActivate: [AuthGuardService] },
  { path: 'profile/update', component: UpdateProfileComponent, canActivate: [AuthGuardService] },
  { path: 'profile/feedback', component: ProfileDisqusComponent, canActivate: [AuthGuardService] },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'api', component: ApiComponent },
  { path: 'search', component: SearchComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'dataset/:domain/:acc', component: DatasetComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'selected', component: SelectedComponent },
  { path: 'dashboard', component: DashboardComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
