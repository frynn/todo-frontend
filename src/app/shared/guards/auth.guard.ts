import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn() ){
    router.navigateByUrl('/login')
    return false
  }
  else {
    return true;
  }
}
// export function authGuard(): CanActivateFn {
//   return() => {
//     const authService = inject(AuthService);
//     const router = inject(Router);
//     if (!authService.isLoggedIn() ) {
//       router.navigateByUrl('/login')
//       return false;
//     }
//     return true;
//   };
// }
