import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './shared/auth/components/login/login.component';
import { SignupComponent } from './shared/auth/components/signup/signup.component';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminModule' },
  { path: 'todo', loadChildren: './pages/todo/todo.module#TodoModule' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule, ]
})
export class AppRoutingModule { }
