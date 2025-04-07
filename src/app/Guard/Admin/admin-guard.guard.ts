import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  const adminToken = localStorage.getItem('adminToken')
  if (adminToken) {

    return true;
  }
  else{
    router.navigateByUrl('admin/signup');
    return false;
  }
};
