import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('signup')
    return false;
  }
  else{
    return true;
  }
};
