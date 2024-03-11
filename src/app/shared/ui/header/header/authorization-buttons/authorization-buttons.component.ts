import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import {authorization, UserService} from '../../../../services/users/user.service';
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-authorization-buttons',
  template: `
    <div class="flex align-items-center">
      <div class="flex align-items-center" *ngIf="user | async as user; else templateIfNotLogged">

      <span *ngIf="user.name">Здравствуй, {{ user?.name }}</span>
      <button (click)="logoutUser($event)" pButton>Выйти</button>
      <p-confirmPopup></p-confirmPopup>
    </div>
      <ng-template #templateIfNotLogged>
        <button *ngIf="!isRegistrationUrRoute" pButton (click)="openRegistration()">
          Регистрация
        </button>
        <button *ngIf="!isLoginUrlRoute" pButton (click)="openLogin()">
          Войти
        </button>
      </ng-template>

    </div>
  `,
})
export class AuthorizationButtonsComponent {
  public get user(){
    return this.userService.user;
  }
  public get isRegistrationUrRoute(): boolean {
    return this.activeRouteLog === authorization.registration;
  }
  public get isLoginUrlRoute(): boolean {
    return this.activeRouteLog === authorization.login;
  }
  private get activeRouteLog() {
    return this.router.url.split('/')[2];
  }
  constructor(
    public readonly router: Router,
    private readonly userService: UserService,
    private confirmationService: ConfirmationService
  ) {}


  public openRegistration() {
    this.router.navigate([`/authorization/${authorization.registration}`]);
  }
  public openLogin(): void {
    this.router.navigate([`/authorization/${authorization.login}`]);
  }

  public logoutUser(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Вы действительно хотите выйти?',
      accept: ()=> {
        this.userService.logout();
        this.router.navigate([`/authorization/${authorization.registration}`]);
      },
      acceptLabel: 'Да',
      rejectLabel: 'Нет'
    })
  }
}
