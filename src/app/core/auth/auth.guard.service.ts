import { inject } from '@angular/core';
import { AuthServiceService } from './auth.service.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthServiceService)
  const router = inject(Router);

  if (authService.isLogin()) {
    return true ;
  }
  else {
    authService.logOut();
    return false;
  }

}
