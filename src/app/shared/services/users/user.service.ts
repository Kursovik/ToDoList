import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/local';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _user: BehaviorSubject<User>;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this._user = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') as string),
    );
  }
  public get users() {
    return this._users.asObservable();
  }
  public setUsers(users: User[]) {
    this._users.next(users);
  }
  public get user() {
    return this._user.asObservable();
  }
  public setUser(user: User) {
    this._user.next(user);
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.local}/users/`).pipe(
      tap((users) => {
        this.setUsers(users);
      }),
    );
  }
  public register(userRegistry: User) {
    return this.users.pipe(
      switchMap(() =>
        this.http.post(`${environment.local}/register`, userRegistry),
      ),
      tap(() => {
        this.router.navigate(['/authorization/login']);
      }),
    );
  }
  public login(user: { email: string; password: string }) {
    const { email, password } = user;
    return this.http
      .post<{ data: User }>(`${environment.local}/auth`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((user) => {
          if (!user) return;
          localStorage.setItem('user', JSON.stringify(user.data));
          this.setUser(user.data as unknown as User);
          this.router.navigate(['/'])
        }),
      );
  }
  public logout() {
    localStorage.removeItem('user');
    this.setUser([] as unknown as User);
    this.router.navigate(['/authorization/login']);
  }
}
