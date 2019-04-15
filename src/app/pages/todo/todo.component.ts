import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectTasksState } from '../../app.state';
import { LogOut} from '../../shared/auth/state/auth.actions';
import { TasksService } from '../../core/services/tasks.service';
import { Task, Tasks } from '../../shared/models/tasks';
import { InitializeWebsocketConnection, RequestUserTasks, WebsocketListener } from './state/tasks.actions';
import { NbDialogService } from '@nebular/theme';
import { AddTaskComponent } from './addtask/addtask.component';
import { EditTaskComponent } from './edittask/edittask.component';

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
      private dialogService: NbDialogService
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
    // Not sure why I have to delay this... but I made it reoccur for when the tasks are updated or added after the initial load.
    setInterval(() => eva.replace(), 200);
  }

  logout(): void { this.store.dispatch(new LogOut); }

  refreshTasks() { this.store.dispatch( new RequestUserTasks() ); }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task);
  }

  openAddTaskModal() {
      this.dialogService.open(AddTaskComponent);
  }

  openEditTaskModal(task: Task) {
    this.dialogService.open(EditTaskComponent, { context: { task: task } });
  }

}
