import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
  Authenticated, NotAuthenticated,
  CheckSession, SessionSuccess, SessionExpired,
  RefreshSession, RefreshSessionSuccess, RefreshSessionFailure,
  GetUserInfo, GetUserInfoSuccess, GetUserInfoFailure,
} from './auth.actions';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, flatMap, map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import {User} from '../../models/user';

@Injectable()
export class AuthEffects {



  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.LOGIN),
      map(( action: LogIn ) => action.payload),
      switchMap(payload => {
        return this.authService.login(payload.username, payload.password)
          .pipe(
            map(( user_tokens ) => new LogInSuccess({ tokens: user_tokens.token }) ),
            catchError(( error ) => of(new LogInFailure({ error: error })) )
          );
      })
    );

  @Effect()
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map(( action: LogInSuccess ) => action.payload),
    switchMap(payload => {
      return this.authService.storetokens(payload.tokens)
        .pipe(
          map(data => new Authenticated( data ))
        );
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  // TODO: Finish Signup Functions
  @Effect()
  SignUp: Observable<any> = this.actions
    .pipe(
      ofType(AuthActionTypes.SIGNUP),
      map((action: SignUp) => action.payload),
      switchMap((payload: User) => {
          return this.authService.signup(payload)
            .pipe(
            map((tokens) => new SignUpSuccess( { tokens: tokens.token } ) ),
            catchError((error) => of(new SignUpFailure({ error: error })) )
            );
        })
    );

  @Effect()
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    map(( action: LogInSuccess ) => action.payload),
    switchMap(payload => {
      return this.authService.storetokens(payload.tokens)
        .pipe(
          map(data => new Authenticated( data ))
        );
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );
  // TODO: Combine SignUpFailure & LogInFailure

  @Effect({ dispatch: false })
  LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  );

  @Effect()
  CheckAuthentication: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.CHECK_AUTHENTICATION),
    map(() => {
      if (localStorage.hasOwnProperty('token')) { return new Authenticated( JSON.parse(localStorage.getItem('token')) );
      } else { return new NotAuthenticated(); }
    })
  );

  @Effect({ dispatch: false })
  NotAuthenticated: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.NOT_AUTHENTICATED),
    tap(() => {
      if (this.authService.redirectURL) { this.router.navigate(['/login']);
      } else { } // TODO: Combine all Failures into one action/effect/reducer to show error message
    } )
  );

  @Effect()
  Authenticated: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.AUTHENTICATED),
    map((action: Authenticated) => action.payload),
    map((tokens: any) => new CheckSession( tokens )
    )
  );

  @Effect()
  CheckSession: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.CHECK_SESSION),
    map((action: CheckSession) => action.payload),
    map((tokens: any) => {
      const token_payload = this.authService.decodeJwtPayload(tokens.access);
      // const token_payload = this.authService.decodeJwtPayload(tokens.payload.token.payload.token.access);
      // console.log('Decoded Access token Payload: ', token_payload);
      const now = new Date();
      const token_payload_date = new Date(0);
      token_payload_date.setUTCSeconds(token_payload.exp);
      // console.log('Expiration Date: ', token_payload_date, now);
      if (token_payload_date < now) { return new SessionExpired( tokens );
      } else { return new SessionSuccess(); }
    } )
  );

  @Effect()
  RefreshSession: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REFRESH_SESSION),
    map((action: RefreshSession) => action.payload),
    switchMap((tokens: any) => this.authService.refreshtoken( tokens.refresh )
      .pipe(
        map(access_token => new RefreshSessionSuccess( access_token ) ),
        catchError((error) => of(new RefreshSessionFailure({ error: error })))
      )
    )
  );

  @Effect()
  RefreshSessionSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REFRESH_SESSION_SUCCESS),
    map((action: RefreshSessionSuccess) => action.payload),
    switchMap((access_token) => this.authService.storerefreshtoken(access_token.access)
      .pipe(
        map((tokens: any) =>  new Authenticated( tokens ) )
      )
    )
  );

  @Effect()
  RefreshSessionFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REFRESH_SESSION_FAILURE),
    map((action: RefreshSessionFailure) => action.payload),
    map((error) => new NotAuthenticated() )
  );

  @Effect()
  SessionSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SESSION_SUCCESS),
    map(() => new GetUserInfo() )
  );

  @Effect()
  SessionExpired: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SESSION_EXPIRED),
    map((action: SessionExpired) => action.payload),
    map((tokens) => new RefreshSession( tokens ) )
  );

  @Effect()
  GetUserInfo: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_INFO),
    switchMap(() => this.authService.getuserdata()
      .pipe(
        map((userdata) => new GetUserInfoSuccess( userdata ) ),
        catchError((error) => of(new GetUserInfoFailure({ error: error })))
      )
    )
  );

    // TODO: Create GetUserInfoFailure Effect

  @Effect({ dispatch: false })
  GetUserInfoSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_INFO_SUCCESS),
    tap((user) => {
      if (this.authService.redirectURL) { this.router.navigate([this.authService.redirectURL]); this.authService.redirectURL = null;
      } else { this.router.navigateByUrl('/'); }
    })
  );

  @Effect({ dispatch: false })
  GetUserInfoFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_USER_INFO_FAILURE),
    map((action: GetUserInfoFailure) => action.payload),
    // map((error) => console.log('Failed to get user info, here is the error => ', error) )
  );

}

