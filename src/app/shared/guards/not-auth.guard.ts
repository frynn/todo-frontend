import {CanActivateFn, Router} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedIn() ){
    router.navigateByUrl('/home')
    return false
  }
  else {
    return true;
  }
}

//   export function notAuthGuard(): CanActivateFn {
//     return () => {
//       const authService = inject(AuthService);
//       const router = inject(Router);
//
//       if (authService.isLoggedIn()) {
//         router.navigateByUrl('/home')
//         return false;
//       }
//       return true;
//     };
// }
