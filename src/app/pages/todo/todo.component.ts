import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../app.state';
import { CheckAuthentication, LogOut, NotAuthenticated } from '../../shared/auth/state/auth.actions';

@Component({
  selector: 'anon-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean;
  user: User = {};
  errorMessage = null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });
  }

  ngOnInit() {

    // if (!this.isAuthenticated) { this.store.dispatch(new CheckAuthentication()); }
  }

  logout(): void { this.store.dispatch(new LogOut); }

}
