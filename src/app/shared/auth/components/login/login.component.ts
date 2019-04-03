import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../../app.state';
import { LogIn } from '../../state/auth.actions';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import {AuthService} from '../../../../core/services/auth.service';

@Component({
  selector: 'anon-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private authService: AuthService,
  ) { this.getState = this.store.select(selectAuthState); }

  ngOnInit() {
    this.getState.subscribe((state) => { this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
    // console.log(this.user);
  }

  goBack() {
    this.authService.redirectURL = null;
    this.location.back();
  }

}
