import { Inject, Injectable } from '@angular/core';
import { CacheStateService } from './cache-state.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {API_URL} from "../injection-tokens/api.token";

@Injectable()
export class StateSliceService<T extends { id: number }> {
  private _state: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  public get state(): Observable<T[]> {
    return this._state.asObservable();
  }
  public get staticState(): T[] {
    return this._state.getValue();
  }
  constructor(
    private cacheStateService: CacheStateService<T>,
    @Inject(API_URL)
    private apiUrl: BehaviorSubject<string>,
  ) {}
  public setState( data: T[]) {
    if (!this.cacheStateService.state[this.apiUrl.getValue()])
      this.cacheStateService.state[this.apiUrl.getValue()] = new BehaviorSubject(data);
    this.cacheStateService.state[this.apiUrl.getValue()].next(data);
    this.updateState(this.apiUrl.getValue());
  }
  public updateState(apiUrl: string): void {
    this._state.next(this.cacheStateService.state[apiUrl].getValue());
  }
}
