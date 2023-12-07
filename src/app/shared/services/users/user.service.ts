import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  public users = new BehaviorSubject<User[]>(
    JSON.parse(localStorage.getItem('user') as string),
  );
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users/`);
  }
}
