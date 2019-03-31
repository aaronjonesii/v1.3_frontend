import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../app.state';
import { Observable } from 'rxjs';
import {CheckAuthentication} from '../../shared/auth/state/auth.actions';


@Injectable()
export class AuthGuardService implements CanActivate {

  getState: Observable<any> = this.store.select(selectAuthState);
  isAuthenticated: boolean;

  constructor(
    public auth: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) { this.getState.subscribe((state) => { this.isAuthenticated = state.isAuthenticated; }); }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.isAuthenticated) {
      // console.log('Redirecting to login from Router Guard because isAuthenticated is false, see for yourself => ', this.isAuthenticated);
      this.auth.redirectURL = state.url;
      this.store.dispatch(new CheckAuthentication());
      return false;
    }
    return true;
  }

}
