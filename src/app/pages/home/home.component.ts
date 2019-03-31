import { Component, OnInit } from '@angular/core';
import { AppState, selectAuthState } from '../../app.state';
import { Store } from '@ngrx/store';
import { CheckAuthentication, LogOut } from '../../shared/auth/state/auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'anon-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  getState: Observable<any> = this.getState = this.store.select(selectAuthState);
  isAuthenticated: boolean;
  user: User = {};
  errorMessage = null;
  redirectURL = null;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
              ) {

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });

    this.authService.redirectURL = this.redirectURL;

    if (!this.isAuthenticated) { this.store.dispatch(new CheckAuthentication()); }
  }

  ngOnInit() {

  }

  logout(): void { this.store.dispatch(new LogOut); }

}
