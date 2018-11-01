import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService
    , private _router: Router
  ) {

  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._authService.getCurrentUser()
        .then(user => {
          return resolve(true);
        }, err => {
          this._router.navigate(['/sign-in']);
          return resolve(false);
        })
    })
  }
}
