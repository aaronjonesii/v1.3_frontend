import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../shared/models/user';
import { urlBase64Decode } from '@nebular/auth/helpers';
import { Token, Tokens } from '../../shared/models/tokens';
import {RefreshSession, SessionExpired, SessionSuccess} from '../../shared/auth/state/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private BASE_URL = 'http://localhost:8000';
  private BASE_URL = 'http://api.anonsys.tech';
  redirectURL: string;
  // TODO: Move redirectURL to store w/router-store

  constructor(
      private http: HttpClient,
      private store: Store<AppState>,
      ) { }

  storetokens(tokens: object): Observable<any> {
    localStorage.setItem('token', JSON.stringify(tokens));
    return of(tokens);
  }

  refreshtoken(refresh_token: string): Observable<any> {
    const url = `${this.BASE_URL}/api-refresh/`;
    return this.http.post<Tokens>(url, { refresh: refresh_token });
  }

  storerefreshtoken(new_access_token: string): Observable<any> {
    const copyof_localStorage = JSON.parse(localStorage.getItem('token'));
    copyof_localStorage.access = new_access_token;
    localStorage.setItem('token', JSON.stringify(copyof_localStorage));
    return of(copyof_localStorage);
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/api-login/`;
    return this.http.post<Tokens>(url, {username, password});
  }

  // TODO: Finish Signup function
  signup(user: User): Observable<any> {
    const url = `${this.BASE_URL}/api-signup/`;
    console.log('User from signup function right before api call, => ', user);
    return this.http.post<User>(url, user);
  }

  getuserdata(): Observable<any> {
    const url = `${this.BASE_URL}/api-user/`;
    return this.http.get<User>(url, {});
  }

  checkifTokenExpired() {
    const tokens = JSON.parse(localStorage.getItem('token'));
    const token_payload = this.decodeJwtPayload(tokens.access);
    // const token_payload = this.authService.decodeJwtPayload(tokens.payload.token.payload.token.access);
    // console.log('Decoded Access token Payload: ', token_payload);
    const now = new Date();
    const token_payload_date = new Date(0);
    token_payload_date.setUTCSeconds(token_payload.exp);
    // console.log('Expiration Date: ', token_payload_date, now);
    if (token_payload_date < now) { this.redirectURL = 'todo'; this.store.dispatch(new RefreshSession(tokens)); }
  }



  decodeJwtPayload(access_token: string): any {
    const payload = access_token;

    if (payload.length === 0) {
      console.error('Cannot extract from an empty payload.');
    }

    const parts = payload.split('.');

    if (parts.length !== 3) {
      console.error(
        `The payload ${payload} is not valid JWT payload and must consist of three parts.`);
    }

    let decoded;
    try {
      decoded = urlBase64Decode(parts[1]);
    } catch (e) {
      console.error(
        `The payload ${payload} is not valid JWT payload and cannot be parsed.`);
    }

    if (!decoded) {
      console.error(
        `The payload ${payload} is not valid JWT payload and cannot be decoded.`);
    }
    return JSON.parse(decoded);
  }

}
