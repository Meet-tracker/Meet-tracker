import { Routes } from '@angular/router';

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
];
