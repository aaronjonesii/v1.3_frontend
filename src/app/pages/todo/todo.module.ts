import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo.component';
import { BoardViewComponent } from './views/board/board.component';
import { ListViewComponent } from './views/list/list.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from '../../core/services/authenticationguard.service';

const routes: Routes = [
  // { path: '', redirectTo: '/board', pathMatch: 'full', },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuardService], children: [
    { path: '', redirectTo: 'board', pathMatch: 'full' },
    { path: 'board', component: BoardViewComponent },
    { path: 'list', component: ListViewComponent },
    ] },
];

export const TODO_COMPONENTS = [
  TodoComponent,
  BoardViewComponent,
  ListViewComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [ ],
  exports: [ RouterModule ],
})
export class TodoModule { }
