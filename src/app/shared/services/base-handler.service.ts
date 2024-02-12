import { Inject, Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { CacheStateService } from './cache-state.service';
import { StateSliceService } from './state-slice.service';
import { API_URL } from '../injection-tokens/api.token';
import { UserService } from './users/user.service';
import { HttpParams } from '@angular/common/http';

/** Базовый handler сервис для всех разделов*/
@Injectable()
export class BaseHandlerService<T extends { id: number }> {
  constructor(
    private baseApiService: BaseApiService<T>,
    private stateSliceService: StateSliceService<T>,
    private cacheStateService: CacheStateService<T>,
    @Inject(API_URL)
    private apiUrl: BehaviorSubject<string>,
    private userService: UserService,
  ) {}

  public initState(): Observable<T[]> {
    return this.apiUrl.pipe(switchMap((api) => this.getAll(api)));
  }
  public getAll(apiUrl: string): Observable<T[]> {
    if (this.cacheStateService.state[apiUrl])
      return this.cacheStateService.state[apiUrl];
    return this.userService.user.pipe(
      filter((user) => !!user),
      map((user) => new HttpParams().set('user_id', user.id)),
      switchMap((params) =>
        this.baseApiService.getAll(params).pipe(
          tap((data) => {
            this.stateSliceService.setState(data);
          }),
        ),
      ),
    );
  }
  public createOrEdit(item: T, method: 'create' | 'edit'): Observable<T> {
    return this.userService.user.pipe(
      map((user) => ({
        ...item,
        user_id: user.id,
      })),
      switchMap((item) => this.createOrEditApi(item, method)),
    );
  }
  private createOrEditApi(item: T, method: 'create' | 'edit'):Observable<T> {
    return this.baseApiService[method](item).pipe(
      tap((responseItem) => {
        this.stateSliceService.setState(
          item.id
            ? [
                ...this.cacheStateService.state[this.apiUrl.getValue()]
                  .getValue()
                  .map((data) => (item.id === data.id ? item : data)),
              ]
            : [
                ...this.cacheStateService.state[
                  this.apiUrl.getValue()
                ].getValue(),
                responseItem,
              ],
        );
      }),
    );
  }
  public create(item: T) {
    return this.createOrEdit(item, 'create');
  }
  public edit(item: T) {
    return this.createOrEdit(item, 'edit');
  }
  public delete(id: number): Observable<unknown> {
    return this.baseApiService.delete(id).pipe(
      tap(() => {
        this.stateSliceService.setState([
          ...this.cacheStateService.state[this.apiUrl.getValue()]
            .getValue()
            .filter((data) => data.id !== id),
        ]);
      }),
    );
  }
}
