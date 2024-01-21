import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm, LoginFormResponse } from '../app/types/Auth';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
class UserToken {}

@Injectable()
class PermissionsService {
  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
  canMatch(currentUser: UserToken): boolean {
    return true;
  }
}

export const canActivateTeam: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(PermissionsService).canActivate();
};

// @Injectable({
//   providedIn: 'root',
// })

//   const canActive: CanActivateFn = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       return true;
//     }
//     return false;
//   }
