import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from '../../core/services/authenticationguard.service';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService], },
];

export const ADMIN_COMPONENTS = [ AdminComponent ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class AdminModule { }
