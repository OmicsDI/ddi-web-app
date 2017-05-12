// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProfileComponent} from "./pages/profile/profile.component";
import {DatabaseComponent} from "./pages/database/database.component";
import {HomeComponent} from "./pages/home/home.component";
import {ApiComponent} from "./pages/api/api.component";
import {SearchComponent} from "./pages/search/search.component";
import {AboutComponent} from "./pages/about/about.component";
import {UnauthorizedComponent} from "./pages/unauthorized/unauthorized.component";
import { AuthGuardService } from './services/auth-guard.service';
import {DatasetComponent} from "./pages/dataset/dataset.component";
import {TermsComponent} from "./pages/terms/terms.component";

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'database', component: DatabaseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'api', component: ApiComponent },
  { path: 'search', component: SearchComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'dataset/:domain/:acc', component: DatasetComponent },
  { path: 'terms', component: TermsComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
