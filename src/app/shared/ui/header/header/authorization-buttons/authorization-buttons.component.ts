import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/users/user.service';
import { User } from '../../../../models/user';
import {Observable, tap} from 'rxjs';

@Component({
  selector: 'app-authorization-buttons',
  template: `
    <button pButton (click)="openRegistration()">Регистрация</button>
    <span *ngIf="(user | async) as user">{{ user.name}}</span>
  `,
})
export class AuthorizationButtonsComponent implements OnInit {
  public user: Observable<User>;
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}
  public openRegistration() {
    this.router.navigate(['/authorization/registration']);
  }

  public ngOnInit(): void {
    this.user = this.userService.user;
  }
}
