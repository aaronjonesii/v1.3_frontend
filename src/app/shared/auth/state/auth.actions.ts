import { Action } from '@ngrx/store';


export enum AuthActionTypes {
  CLEAR_AUTHENTICATION_DETAILS        =   '[AUTH] Clear Authentication Details',
  CHECK_AUTHENTICATION                =   '[AUTH] Check Authentication',
  NOT_AUTHENTICATED                   =   '[AUTH] Not Authenticated',
  AUTHENTICATED                       =   '[AUTH] Authenticated',
  CHECK_SESSION                       =   '[AUTH] Check Session',
  REFRESH_SESSION                     =   '[AUTH] Refresh Session',
  REFRESH_SESSION_SUCCESS             =   '[AUTH] Refresh Session Success',
  REFRESH_SESSION_FAILURE             =   '[AUTH] Refresh Session Failure',
  SESSION_SUCCESS                     =   '[AUTH] Session Success',
  SESSION_EXPIRED                     =   '[AUTH] Session Expired',
  LOGIN                               =   '[AUTH] Login',
  LOGIN_SUCCESS                       =   '[AUTH] Login Success',
  LOGIN_FAILURE                       =   '[AUTH] Login Failure',
  SIGNUP                              =   '[AUTH] Signup',
  SIGNUP_SUCCESS                      =   '[AUTH] Signup Success',
  SIGNUP_FAILURE                      =   '[AUTH] Signup Failure',
  LOGOUT                              =   '[AUTH] Logout', // TODO: Create LogoutConfirmed, LogoutCancelled Actions
  GET_USER_INFO                       =   '[AUTH] Get User Info',
  GET_USER_INFO_SUCCESS               =   '[AUTH] Get User Info Success',
  GET_USER_INFO_FAILURE               =   '[AUTH] Get User Info Failure',
}

export class LogIn implements Action { readonly type = AuthActionTypes.LOGIN; constructor(public payload: any) {} }
export class LogInSuccess implements Action { readonly type = AuthActionTypes.LOGIN_SUCCESS; constructor(public payload: any) {} }
export class LogInFailure implements Action { readonly type = AuthActionTypes.LOGIN_FAILURE; constructor(public payload: any) {} }
export class ClearAuthenticationDetails implements Action { readonly type = AuthActionTypes.CLEAR_AUTHENTICATION_DETAILS; }
export class CheckAuthentication implements Action { readonly type = AuthActionTypes.CHECK_AUTHENTICATION; }
export class NotAuthenticated implements Action { readonly type = AuthActionTypes.NOT_AUTHENTICATED; }
export class Authenticated implements Action { readonly type = AuthActionTypes.AUTHENTICATED; constructor(public payload: any) { } }
export class CheckSession implements Action { readonly type = AuthActionTypes.CHECK_SESSION; constructor(public payload: any) { } }
export class RefreshSession implements Action { readonly type = AuthActionTypes.REFRESH_SESSION; constructor(public payload: any) { } }
export class RefreshSessionSuccess implements Action { readonly type = AuthActionTypes.REFRESH_SESSION_SUCCESS; constructor(public payload: any) { } }
export class RefreshSessionFailure implements Action { readonly type = AuthActionTypes.REFRESH_SESSION_FAILURE; constructor(public payload: any) { } }
export class SessionSuccess implements Action { readonly type = AuthActionTypes.SESSION_SUCCESS; }
export class SessionExpired implements Action { readonly type = AuthActionTypes.SESSION_EXPIRED; constructor(public payload: any) { } }
export class SignUp implements Action { readonly type = AuthActionTypes.SIGNUP; constructor(public payload: any) {} }
export class SignUpSuccess implements Action { readonly type = AuthActionTypes.SIGNUP_SUCCESS; constructor(public payload: any) {} }
export class SignUpFailure implements Action { readonly type = AuthActionTypes.SIGNUP_FAILURE; constructor(public payload: any) {} }
export class LogOut implements Action { readonly type = AuthActionTypes.LOGOUT; }
export class GetUserInfo implements Action { readonly type = AuthActionTypes.GET_USER_INFO; }
export class GetUserInfoSuccess implements Action { readonly type = AuthActionTypes.GET_USER_INFO_SUCCESS; constructor(public payload: any) { } }
export class GetUserInfoFailure implements Action { readonly type = AuthActionTypes.GET_USER_INFO_FAILURE; constructor(public payload: any) { } }


export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | ClearAuthenticationDetails
  | CheckAuthentication
  | NotAuthenticated
  | Authenticated
  | CheckSession
  | RefreshSession
  | RefreshSessionSuccess
  | RefreshSessionFailure
  | SessionSuccess
  | SessionExpired
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | GetUserInfo
  | GetUserInfoSuccess
  | GetUserInfoFailure;
