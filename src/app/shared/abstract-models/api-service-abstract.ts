import { Observable } from 'rxjs';
import {HttpParams} from "@angular/common/http";

export abstract class ApiServiceAbstract<T> {
  public abstract getAll(params?: HttpParams): Observable<T[]>;
  public abstract create(data: T): Observable<T>;
  public abstract edit(data: T): Observable<T>;
  public abstract delete(id: number): Observable<unknown>;
}
