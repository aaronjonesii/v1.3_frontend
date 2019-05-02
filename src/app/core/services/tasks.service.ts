import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Subject } from 'rxjs';
import { Task } from '../../shared/models/tasks';
import { Message } from './websocket.service';
import { environment } from '../../../environments/environment';

// const SERVER_URL = 'ws://localhost:8000/ws/tasks/';
// const SERVER_URL = 'ws://api.anonsys.tech/ws/tasks/';
const SERVER_URL: string = `ws://${environment.BACKEND_DOMAIN}/ws/tasks/`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  messages: Subject<any>; // Would this be tasks?
  socket = this.ws.socket$; // Get socket from WebSocket Service
  tasks = {}; // TODO: Make observable for components, effect populates this variable

  constructor( private ws: WebsocketService ) {  }

  createTask(task: Task) {
      const msg: Message = { type: 'create.task', data: task };
      // alert('From taskService, message that would be sent to websocket server => ' + JSON.stringify(msg));
      this.ws.socket$.next(msg);
  }

  deleteTask(task: Task) {
      const msg: Message = { type: 'delete.task', data: task };
      // alert('From taskService, message that would be sent to websocket server => ' + JSON.stringify(msg));
      this.ws.socket$.next(msg);
  }

  updateTask(task: Task) {
      const msg = { type: 'update.task', data: task };
      // alert('From taskService, this will be the task sent to the server for updating' + JSON.stringify(msg));
      this.ws.socket$.next(msg);
  }

  refreshTasks() {
    this.ws.socket$.next({ 'type': 'view.tasks' });
  }

}
