import { HttpInterceptorFn } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { inject } from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const apiService: ApiService = inject(ApiService);
  const token: string | null = apiService.getToken();

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });

    return next(authReq);
  }

  return next(req);
};
