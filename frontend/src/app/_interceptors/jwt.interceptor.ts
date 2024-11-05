import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../_services/account.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accoutService = inject(AccountService);

  if (accoutService.currentUser) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accoutService.currentUser()?.token}`,
      },
    });
  }

  return next(req);
};