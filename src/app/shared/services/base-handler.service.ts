import { Inject, Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { BehaviorSubject, Observable, switchAll, switchMap, tap } from 'rxjs';
import { CacheStateService } from './cache-state.service';
import { StateSliceService } from './state-slice.service';
import {API_URL} from "../injection-tokens/api.token";

@Injectable()
export class BaseHandlerService<T extends { id: number }> {
  public api = 'notes';
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
    console.log(apiUrl);
    return this.cacheStateService.state[this.api]
      ? this.cacheStateService.state[this.api].asObservable()
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
                ...this.cacheStateService.state[this.api]
                  .getValue()
                  .map((data) => {
                    return item.id === data.id ? item : data;
                  }),
              ]
            : [...this.cacheStateService.state[this.api].getValue(), item],
        );
        console.log(this.cacheStateService.state[this.api]);
      }),
    );
  }
  public create(item: T) {
    return this.createOrEdit(item, 'create');
  }
  public edit(item: T) {
    return this.createOrEdit(item, 'edit');
  }
}
