import { CanActivateFn, Router } from '@angular/router';
import { Stored_Keys } from '../constants/stored-keys';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem(Stored_Keys.token);
  console.log('Try to logged in...');
  if (token) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
