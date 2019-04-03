import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../../../app.state';
import { SignUp } from '../../state/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'anon-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor( private store: Store<AppState> ) { this.getState = this.store.select(selectAuthState); }

  ngOnInit() { this.getState.subscribe((state) => { this.errorMessage = state.errorMessage; }); }

  onSubmit(): void {
    const payload = {
      username: this.user.username,
      password1: this.user.password,
      password2: this.user.password2,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email
    };
    this.store.dispatch(new SignUp(payload));
    // console.log(payload);
  }

}
