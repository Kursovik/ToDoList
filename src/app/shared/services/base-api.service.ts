import { Injectable } from '@angular/core';
import {ApiServiceAbstract} from "../abstract-models/api-service-abstract";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseApiService<T> extends ApiServiceAbstract<T>{
  create(data: T): Observable<T> {
    return of(data);
  }

  delete(id: number): Observable<number> {
    return of(id);
  }

  edit(data: T): Observable<T> {
    return of(data);
  }

  getAll(): Observable<T[]> {
    return of([
      {
        title: 'Note1',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 1,
      },
      {
        title: 'Not2',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 2,
      },
      {
        title: 'Note3',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 3,
      },
      {
        title: 'Note4',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 4,
      },
      {
        title: 'Note5',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 5,
      },
      {
        title: 'Note6',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 6,
      },
      {
        title: 'Note7',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 7,
      },
    ]) as unknown as Observable<T[]>;
  }
}
