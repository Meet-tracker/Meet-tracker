import { CanActivateFn, CanActivateChild, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { inject, NgZone } from '@angular/core';
import { map } from 'rxjs';

export const authGuardActivate: CanActivateFn = (route, state) => {

  const apiService: ApiService = inject(ApiService);
  const router: Router = inject(Router);
  const ngZone: NgZone = inject(NgZone);

  return ngZone.onStable
    .pipe(
      map(() => {
        if (apiService.isAuthenticated()) {
          return true;
        } else {
          router.navigate(['/auth']);
          return false;
        }
      })
    )
};
