import { CanActivateFn, CanActivateChild, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const authGuardActivate: CanActivateFn = (route, state) => {

  const apiService: ApiService = inject(ApiService);
  const router: Router = inject(Router);

  if (apiService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
