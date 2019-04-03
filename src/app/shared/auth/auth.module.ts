import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from '../utils/storerouter';

const AUTH_COMPONENTS = [
  LoginComponent,
  SignupComponent,
];

@NgModule({
  declarations: [ ...AUTH_COMPONENTS ],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  exports: [ ...AUTH_COMPONENTS ],
  providers: [ AuthService ]
})
export class AuthModule { }
