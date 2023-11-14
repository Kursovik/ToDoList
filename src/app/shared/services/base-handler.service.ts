import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import { CacheStateService } from './cache-state.service';
import {StateSliceService} from "./state-slice.service";

@Injectable({
  providedIn: 'root',
})
export class BaseHandlerService<T extends {id: number}> {
  public api = 'notes';
  constructor(
    private baseApiService: BaseApiService<T>,
    private cacheStateService: CacheStateService<T>,
    private stateSliceService: StateSliceService<T>,
  ) {}

  public initState(): Observable<T[]> {
    if (!!this.cacheStateService.globalState[this.api])
      return this.cacheStateService.globalState[this.api].asObservable();
    return this.baseApiService.getAll().pipe(
      tap((data) => {
        this.cacheStateService.globalState[this.api] = new BehaviorSubject<T[]>(
          data,
        );
          this.stateSliceService.set(data);
      }),
    );
  }
  public create(item: T){
    return this.baseApiService.create(item).pipe(
      tap(data=>{
        this.stateSliceService.create(data)
      })
    )
  }
  public edit(item:T){
    return this.baseApiService.edit(item).pipe(
      tap(data=>{
        this.stateSliceService.edit(data)
      })
    )
  }

}
