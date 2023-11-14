import { Injectable } from '@angular/core';
import { CacheStateService } from './cache-state.service';

@Injectable({
  providedIn: 'root',
})
export class StateSliceService<T extends { id: number}> {
  constructor(private cacheStateService: CacheStateService<T>) {}
  public set(data: T[]){
    this.cacheStateService.setState(data);
  }
  public create(item: T) {
       this.cacheStateService.setState(
         [
           ...this.cacheStateService.getStaticState(),
           item,
         ]
       )
  }
  public edit(item: T) {
    console.log(item)
    this.cacheStateService.setState(
      [
        ...this.cacheStateService.getStaticState().map(
          (value=> {
            return item.id === value.id ? item : value
          })
        )
      ]
    )
  }
}
