import { Routes } from '@angular/router';
import { ResultComponent } from './result/components/result.component';
import { authGuardActivate } from './guards/auth.guard';

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
    path: 'result/:id',
    component: ResultComponent,
    canActivate: [authGuardActivate],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
