import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheStateService<T> {
  private _state: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public globalState: { [key: string]: BehaviorSubject<T[]> } = {};

  public get state(){
    return this._state.asObservable()
  }
  public setState(value: T[]){
    this._state.next(value)
  }
  public getStaticState(){
    return this._state.getValue();
  }
}
