// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProfileComponent} from "./profile/profile.component";
import {DatabaseComponent} from "./database/database.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import { AuthGuard } from './auth-guard.service';

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
  { path: 'unauthorized', component: UnauthorizedComponent }
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
