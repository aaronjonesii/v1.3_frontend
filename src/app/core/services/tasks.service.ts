import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { Token } from '../../shared/models/tokens';

const SERVER_URL = 'ws://localhost:8000/ws/tasks/';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  messages: Subject<any>; // Would this be tasks?
  socket = this.ws.socket$; // Get socket from WebSocket Service
  tasks = {}; // TODO: Make observable for components, effect populates this variable

  test_task = {
        type: 'create.task',
        data: {
            title: 'Add Task Modal',
            description: 'Create Modal for adding a new task with all fields available.',
            status: 'TODO',
            tags: '["test", "hardcoded"]',
        },
    };

  constructor( private ws: WebsocketService ) {  }

  createTask(task= this.test_task) {
    this.ws.socket$.next(task);
  }

  refreshTasks() {
    this.ws.socket$.next({ 'type': 'view.tasks' });
  }

}
