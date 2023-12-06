import { Observable } from 'rxjs';

export abstract class ApiServiceAbstract<T> {
  public abstract getAll(): Observable<T[]>;
  public abstract create(data: T): Observable<T>;
  public abstract edit(data: T): Observable<T>;
  public abstract delete(id: number): Observable<unknown>;
}
