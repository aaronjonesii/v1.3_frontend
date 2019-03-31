import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('api-login') || req.url.includes('api-refresh') || req.url.includes('api-signup')) {

      // console.log('URL was in filter list... Not adding token to header');
      return next.handle(req);

    } else if (localStorage.hasOwnProperty('token')) {

      // console.log('[ √ ] Check Request headers!', req.url);
      const tokens = JSON.parse(localStorage.getItem('token'));
      req = this.setHeader(req, tokens.access);
      return next.handle(req);

    } else {

      // console.log('token was not in localStorage, See for yourself => ', localStorage);
      return next.handle(req);

    }

  }


  setHeader(req, access_token) {
    const JWT = `Bearer ${access_token}`;
    return req.clone({
      setHeaders: {
        Authorization: JWT,
      },
    });
  }

}
