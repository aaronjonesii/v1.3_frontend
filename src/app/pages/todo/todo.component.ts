import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectTasksState } from '../../app.state';
import { LogOut} from '../../shared/auth/state/auth.actions';
import { TasksService } from '../../core/services/tasks.service';
import { InitializeWebsocketConnection, RequestUserTasks, WebsocketListener } from './state/tasks.actions';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { AddTaskComponent } from './functions/addtask/addtask.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SIDEBAR_MENU_ITEMS } from './sidebar-menu';

declare var eva: any;

@Component({
  selector: 'anon-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  getState: Observable<any>;
  errorMessage = null;
  tasks: any; // Tasks[]; // TODO: Make value same as the store's tasks using select in the constructor
  menu = SIDEBAR_MENU_ITEMS;

  constructor(
      private store: Store<AppState>,
      private tasksService: TasksService,
      private dialogService: NbDialogService,
      private sidebarService: NbSidebarService,
  ) {
    this.store.dispatch( new InitializeWebsocketConnection() );
    this.store.dispatch( new WebsocketListener() );
  }

  ngOnInit() {
    // if (!this.isAuthenticated) { this.store.dispatch(new CheckAuthentication()); }
    this.store.dispatch( new RequestUserTasks() );

    // Because Eva icons are used in this component
    // Not sure why I have to delay this... but I made it reoccur for when the tasks are updated or added after the initial load.
    setInterval(() => eva.replace(), 200);
  }

  toggleSidebar() {
    this.sidebarService.toggle(true, 'todo-sidebar');
    return false;
  }

  logout(): void { this.store.dispatch(new LogOut); }

  refreshTasks() { this.store.dispatch( new RequestUserTasks() ); }

  openAddTaskModal() {
      this.dialogService.open(AddTaskComponent);
  }


}
