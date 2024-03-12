import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userToken = localStorage.getItem('token');


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.userToken
      }
    })
    return next.handle(authRequest)
  }
}
