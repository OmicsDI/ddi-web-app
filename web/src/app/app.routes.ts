// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProfileComponent} from "./profile/profile.component";
import {DatabaseComponent} from "./database/database.component";
import {HomeComponent} from "./home/home.component";
import {ApiComponent} from "./api/api.component";
import {SearchComponent} from "./search/search.component";
import {AboutComponent} from "./about/about.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import { AuthGuard } from './auth-guard.service';
import {DatasetComponent} from "./dataset/dataset.component";

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'database', component: DatabaseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'api', component: ApiComponent },
  { path: 'search', component: SearchComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'dataset/:domain/:acc', component: DatasetComponent },
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
