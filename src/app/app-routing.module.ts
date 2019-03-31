import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './shared/auth/components/login/login.component';
import { SignupComponent } from './shared/auth/components/signup/signup.component';
import { TodoComponent } from './pages/todo/todo.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthGuardService } from './core/services/authenticationguard.service';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule, ]
})
export class AppRoutingModule { }
