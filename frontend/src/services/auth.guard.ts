import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //canActivate status boolean
  if (authService.isLoggedIn) {
    return true;
  }
  // Redirect to the login page if not logged in
  return router.parseUrl('/login');
};
