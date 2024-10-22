import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
  },
];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
