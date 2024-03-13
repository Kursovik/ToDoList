import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/local';
import { GlobalMessageService } from '../global-message.service';

export const authorization = {
  registration: 'registration',
  login: 'login',
};
@Injectable()
export class UserService {
  private _user: BehaviorSubject<User>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private globalMessageService: GlobalMessageService,
  ) {
    this._user = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') as string),
    );
  }
  public get user() {
    return this._user.asObservable();
  }
  public setUser(user: User) {
    this._user.next(user);
  }
  public get isUserLoggedIn(){
    return !!localStorage.getItem('token')
  }

  public register(userRegistry: User) {
    return this.http.post(`${environment.local}/register`, userRegistry).pipe(
      tap(() => {
        this.globalMessageService.addMessage('success','Поздравляем!', 'Регистрация прошла успешно!')
        this.router.navigate([`/authorization/${authorization.login}`]);
      }),
      catchError((err) => {
        this.globalMessageService.addMessage('error','Ошибка при регистрации','Пользователь с такой электронной почтой уже существует')
        console.error(err);
        return EMPTY;
      }),
    );
  }
  public login(user: { email: string; password: string }) {
    const { email, password } = user;
    return this.http
      .post<{ token: string; data: User }>(`${environment.local}/auth`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((user) => {
          if (!user) return;
          localStorage.setItem('token', user.token);
          this.setUser(user.data as unknown as User);
          this.globalMessageService.addMessage('success','Успешно',`Вход выполнен под пользователем ${user.data.name}`)
          this.router.navigate(['/']);
        }),
        catchError((err)=>{
          this.globalMessageService.addMessage('error','Вы ввели неправильный логин и пароль', err)
          return EMPTY
        })
      );
  }
  public logout() {
    this.setUser(null as unknown as User);
    this.router.navigate([`/authorization/${authorization.login}`]);
  }
}
