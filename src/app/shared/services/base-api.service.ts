import { Inject, Injectable } from '@angular/core';
import { ApiServiceAbstract } from '../abstract-models/api-service-abstract';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL } from '../injection-tokens/api.token';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/local';
/** Базовый api сервис для всех разделов*/
@Injectable()
export class BaseApiService<
  T extends { id: number },
> extends ApiServiceAbstract<T> {
  constructor(
    @Inject(API_URL)
    private apiUrl: BehaviorSubject<string>,
    private readonly http: HttpClient,
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
    return this.http.patch<T>(
      `${environment.local}/${this.apiUrl.getValue()}/${data.id}`,
      data,
    );
  }

  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(`${environment.local}/${this.apiUrl.getValue()}`,{params});
  }
}
