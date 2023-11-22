import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type CacheStateType<T> = { [key: string]: BehaviorSubject<T[]> };
@Injectable({
  providedIn: 'root',
})
export class CacheStateService<T> {
  public state: CacheStateType<T> = {};
}
