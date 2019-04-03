import * as auth from './shared/auth/state/auth.reducer';
import { createFeatureSelector } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
  authState: auth.State;
  router: RouterState;
}

export const reducers = { auth: auth.reducer, router: routerReducer };

export const selectAuthState = createFeatureSelector<AppState>('auth');
