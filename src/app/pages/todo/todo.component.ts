import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { User } from '../../shared/models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../app.state';
import {
  CheckAuthentication,
  InitializeWebsocketConnection,
  LogOut,
  NotAuthenticated,
  RequestUserTasks, WebsocketListener
} from '../../shared/auth/state/auth.actions';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WebsocketService } from '../../core/services/websocket.service';
import {map} from 'rxjs/operators';
import {TasksService} from '../../core/services/tasks.service';
import {PRIORITIES, STATUSES, Task, Tasks} from '../../shared/models/tasks';

@Component({
  selector: 'anon-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: boolean;
  user: User = {};
  errorMessage = null;
  tasks: Tasks[]; // TODO: Make value same as the store's tasks using select in the constructor

  constructor(
      private store: Store<AppState>,
      private tasksService: TasksService,
  ) {
    this.getState = this.store.select(selectAuthState);

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
      this.tasks = state.tasks;
    });

    this.store.dispatch( new InitializeWebsocketConnection() );
    this.store.dispatch( new WebsocketListener() );

  }

  ngOnInit() {
    // if (!this.isAuthenticated) { this.store.dispatch(new CheckAuthentication()); }
    this.store.dispatch( new RequestUserTasks() );
  }

  logout(): void { this.store.dispatch(new LogOut); }

  refreshTasks() { this.store.dispatch( new RequestUserTasks() ); }

}
