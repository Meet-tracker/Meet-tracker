import { Routes } from '@angular/router';
import { ResultComponent } from './result/components/result.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.router-module').then(m => m.AuthRouterModule),
  },
  {
    path: 'result/:id',
    component: ResultComponent,
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];
