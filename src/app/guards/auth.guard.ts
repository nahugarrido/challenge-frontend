import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log('CanActivate called');
    const isLoggedIn = this.auth.isAuthenticated();
    if (isLoggedIn) {
      return true;
    } else {
      console.log('No podes jeje');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
