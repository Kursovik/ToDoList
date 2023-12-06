import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Injectable()
export class LoaderService {
  private _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loading(){
    return this._loading.asObservable();
  }
  public isLoading(request$: Observable<unknown>) {
    this._loading.next(true);
    return request$.pipe(
      finalize(() => this._loading.next(false)),
      tap(() => this._loading.next(false)),
    );
  }
}
