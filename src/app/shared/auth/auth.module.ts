import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


// Components in from this module are imported in the app.module
// I may have to bring this back for lazy-loading
export const AUTH_COMPONENTS = [
  LoginComponent,
  SignupComponent,
];

@NgModule({
  declarations: [ ],
  imports: [
    RouterModule,
    CommonModule,
  ],
  exports: [ ],
  providers: [ AuthService ]
})
export class AuthModule { }
