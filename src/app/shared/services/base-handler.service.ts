import { Inject, Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { CacheStateService } from './cache-state.service';
import { StateSliceService } from './state-slice.service';
import { API_URL } from '../injection-tokens/api.token';

/** Базовый handler сервис для всех разделов*/
@Injectable()
export class BaseHandlerService<T extends { id: number }> {
  constructor(
    private baseApiService: BaseApiService<T>,
    private stateSliceService: StateSliceService<T>,
    private cacheStateService: CacheStateService<T>,
    @Inject(API_URL)
    private apiUrl: BehaviorSubject<string>,
  ) {}

  public initState(): Observable<T[]> {
    return this.apiUrl.pipe(switchMap((api) => this.getAll(api)));
  }
  public getAll(apiUrl: string): Observable<T[]> {
    return this.cacheStateService.state[apiUrl]
      ? this.cacheStateService.state[apiUrl].asObservable()
      : this.baseApiService.getAll().pipe(
          tap((data) => {
            this.stateSliceService.setState(data);
          }),
        );
  }
  public createOrEdit(item: T, method: 'create' | 'edit'): Observable<T> {
    return this.baseApiService[method](item).pipe(
      tap(() => {
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
                item,
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
      tap((id) => {
        this.stateSliceService.setState([
          ...this.cacheStateService.state[this.apiUrl.getValue()]
            .getValue()
            .filter((data) => data.id !== id),
        ]);
      }),
    );
  }
}
