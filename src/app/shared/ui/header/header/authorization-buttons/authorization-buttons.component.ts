import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/users/user.service';
import { User } from '../../../../models/user';
import { Observable } from 'rxjs';

const logConst = {
  registration: 'registration',
  login: 'login',
};
@Component({
  selector: 'app-authorization-buttons',
  template: `
    <div class="flex align-items-center">
      <div *ngIf="!(user | async) as user">
        <button *ngIf="!isRegistration" pButton (click)="openRegistration()">
          Регистрация
        </button>
        <button *ngIf="!isLogin" pButton (click)="openLogin()">
          Войти
        </button>
      </div>
      <div *ngIf="user | async as user">
        <span *ngIf="user.name">Здравствуй, {{ user?.name }}</span>
        <button (click)="logoutUser()" pButton>Выйти</button>
      </div>
    </div>
  `,
})
export class AuthorizationButtonsComponent implements OnInit {
  public user: Observable<User>;

  private get activeRouteLog() {
    return this.router.url.split('/')[2];
  }
  public get isRegistration(): boolean {
    return this.activeRouteLog === logConst.registration;
  }
  public get isLogin(): boolean {
    return this.activeRouteLog === logConst.login;
  }
  constructor(
    public readonly router: Router,
    private readonly userService: UserService,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.user = this.userService.user;
  }
  public openRegistration() {
    this.router.navigate([`/authorization/${logConst.registration}`]);
  }
  public openLogin(): void {
    this.router.navigate([`/authorization/${logConst.login}`]);
  }

  logoutUser() {
    this.userService.logout();
    this.router.navigate([`/authorization/${logConst.registration}`]);
  }
}
