import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/users/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: UserService, private readonly router: Router) {

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    !this.authService.isUserLoggedIn && this.router.navigate(['/authorization/login']);
    return this.authService.isUserLoggedIn;
  }

}
