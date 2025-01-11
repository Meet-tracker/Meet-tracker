import { Routes } from '@angular/router';
import { authGuardActivate } from './guards/auth.guard';
import { ServerSettingsComponent } from './server-settings/server-settings.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [authGuardActivate],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.router-module').then(m => m.AuthRouterModule),
  },
  {
    path: 'server-settings',
    component: ServerSettingsComponent,
    canActivate: [authGuardActivate],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuardActivate],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
