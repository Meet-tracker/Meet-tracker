import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthComponent } from './components/auth.component';
import { RouterModule, Routes } from '@angular/router';
import { TuiInputModule } from '@taiga-ui/legacy';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
];
const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);

@NgModule({
  declarations: [AuthComponent],
  imports: [routing, TuiInputModule, ReactiveFormsModule, TuiButton],
})
export class AuthRouterModule {}
