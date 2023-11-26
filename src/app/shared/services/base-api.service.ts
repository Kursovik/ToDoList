import { Inject, Injectable } from '@angular/core';
import { ApiServiceAbstract } from '../abstract-models/api-service-abstract';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { API_URL } from '../injection-tokens/api.token';
/** Заглушка для бэка */
const data: { [key: string]: Array<unknown>} = {
  notes: [
    {
      title: 'Встать',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur lorem ipsum dolor sit amet, consectetur',
      id: 1,
    },
    {
      title: 'Помыть посуду',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur',
      id: 2,
    },
    {
      title: 'Сходить в магазин и купить продукты',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur',
      id: 3,
    },
    {
      title: 'Постирать вещи',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur',
      id: 4,
    },
    {
      title: 'Определить планы на будущее',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur',
      id: 5,
    },
    {
      title: 'Приготовить поесть',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur',
      id: 6,
    },
    {
      title: 'Погулять с девушкой',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet,  consectetur',
      id: 7,
    },
  ],
};
/** Базовый api сервис для всех разделов*/
@Injectable()
export class BaseApiService<T> extends ApiServiceAbstract<T> {
  constructor(
    @Inject(API_URL)
    private apiUrl: BehaviorSubject<string>,
  ) {
    super();
  }
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
    return of(data[this.apiUrl.getValue()]) as unknown as Observable<T[]>;
  }
}
