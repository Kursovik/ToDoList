import { Inject, Injectable } from '@angular/core';
import { ApiServiceAbstract } from '../abstract-models/api-service-abstract';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../injection-tokens/api.token';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/local';
import {UserService} from "./users/user.service";
/** Базовый api сервис для всех разделов*/
@Injectable()
export class BaseApiService<
  T extends { id: number },
> extends ApiServiceAbstract<T> {
  constructor(
    @Inject(API_URL)
    private apiUrl: BehaviorSubject<string>,
    private readonly http: HttpClient,
    private userService: UserService,
  ) {
    super();
  }
  create(data: T): Observable<T> {
    return this.http.post<T>(
      `${environment.local}/${this.apiUrl.getValue()}`,
      data,
    );
  }

  delete(id: number): Observable<unknown> {
    return this.http.delete<unknown>(`${environment.local}/${this.apiUrl.getValue()}/${id}`);
  }

  edit(data: T): Observable<T> {
    return this.http.put<T>(
      `${environment.local}/${this.apiUrl.getValue()}/${data.id}`,
      data,
    );
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${environment.local}/${this.apiUrl.getValue()}`);
  }
}
