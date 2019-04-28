import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
];

export const HOME_COMPONENTS = [ HomeComponent ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule,
  ]
})
export class HomeModule { }
