import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectTasksState } from '../../app.state';
import { LogOut} from '../../shared/auth/state/auth.actions';
import { TasksService } from '../../core/services/tasks.service';
import {Task, Tasks} from '../../shared/models/tasks';
import { InitializeWebsocketConnection, RequestUserTasks, WebsocketListener } from './state/tasks.actions';

declare var eva: any;

@Component({
  selector: 'anon-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  getState: Observable<any>;
  errorMessage = null;
  tasks: Tasks[]; // TODO: Make value same as the store's tasks using select in the constructor

  constructor(
      private store: Store<AppState>,
      private tasksService: TasksService,
  ) {
    this.getState = this.store.select(selectTasksState);

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.tasks = state.tasks;
    });

    this.store.dispatch( new InitializeWebsocketConnection() );
    this.store.dispatch( new WebsocketListener() );

  }

  ngOnInit() {
    // if (!this.isAuthenticated) { this.store.dispatch(new CheckAuthentication()); }
    this.store.dispatch( new RequestUserTasks() );

    // Because Eva icons are used in this component
    setTimeout(() => eva.replace(), 1000); // Not sure why I have to delay this...
  }

  logout(): void { this.store.dispatch(new LogOut); }

  refreshTasks() { this.store.dispatch( new RequestUserTasks() ); }

  deleteTask(task: Task) {
    console.log('Deleted Task => ', task);
  }

}
