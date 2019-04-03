import {Component, OnInit} from '@angular/core';
import {CheckAuthentication} from './shared/auth/state/auth.actions';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from './app.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<router-outlet> </router-outlet>`
})
export class AppComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => { this.isAuthenticated = state.isAuthenticated; });
  }

}
