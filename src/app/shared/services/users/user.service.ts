import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, catchError, EMPTY, tap} from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/local';


export const authorization = {
  registration: 'registration',
  login: 'login',
};
@Injectable({ providedIn: 'root' })
export class UserService {
  private _user: BehaviorSubject<User>;
  constructor(
    private http: HttpClient,
    private router: Router,
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
  public register(userRegistry: User) {
    return this.http.post(`${environment.local}/register`, userRegistry).pipe(
      tap(() => {
        this.router.navigate([`/authorization/${authorization.login}`]);
      }),
      catchError((err)=> {
        console.error(err)
        return EMPTY

      })
    );
  }
  public login(user: { email: string; password: string }) {
    const { email, password } = user;
    return this.http
      .post<{ token: string ,data: User }>(`${environment.local}/auth`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((user) => {
          console.log(user);
          if (!user) return;
          localStorage.setItem('token',user.token);
          this.setUser(user.data as unknown as User);
          this.router.navigate(['/']);
        }),
      );
  }
  public logout() {
   // localStorage.removeItem('user');
    this.setUser(null as unknown as User);
    this.router.navigate([`/authorization/${authorization.login}`]);
  }
}
