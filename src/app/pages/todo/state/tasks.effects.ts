import { Injectable } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {
    TasksActionTypes,
    WebsocketConnectionClosed,
    ReceivedUserTasks,
    WebsocketConnectionEstablished,
} from './tasks.actions';

import { Observable, of } from 'rxjs';
import { catchError, concatMap, flatMap, map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';
import { WebsocketService } from '../../../core/services/websocket.service';
import { TasksService } from '../../../core/services/tasks.service';

@Injectable()
export class TasksEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private tasksService: TasksService,
    private websocketService: WebsocketService,
    private router: Router,
  ) {}

@Effect({ dispatch: false })
  InitializeWebsocketConnection: Observable<any> = this.actions.pipe(
    ofType(TasksActionTypes.INITIALIZE_WEBSOCKET_CONNECTION),
    tap(() => this.websocketService.initializeWebsocketConnection() ),
    // tap(() => alert('InitializeWebsocketConnection Effect...') ),
  );

  @Effect({ dispatch: false })
  WebsocketConnectionEstablished: Observable<any> = this.actions.pipe(
    ofType(TasksActionTypes.WEBSOCKET_CONNECTION_ESTABLISHED),
  );

  @Effect({ dispatch: false })
  WebsocketConnectionFailed: Observable<any> = this.actions.pipe(
    ofType(TasksActionTypes.WEBSOCKET_CONNECTION_FAILED),
  );

  @Effect({ dispatch: false })
  WebsocketConnectionClosed: Observable<any> = this.actions.pipe(
    ofType(TasksActionTypes.WEBSOCKET_CONNECTION_CLOSED),
    map((action: WebsocketConnectionClosed) => action.payload),
    tap((error) => { alert('Websocket Connection Closed'); console.error(error); this.router.navigate(['/']); } ),
  );

  @Effect()
  WebsocketListener: Observable<any> = this.actions.pipe(
      ofType(TasksActionTypes.WEBSOCKET_LISTENER),
      switchMap(() => this.websocketService.socket$.pipe(
          map((msg: any) => {
                  if (msg.type === 'TASKS') { return new ReceivedUserTasks(msg.data);
                  } else { console.log('Received  message from websocket server => ', msg); }
                }),
          // catchError((error) => of( alert('Error from Websocket Listener => ' + JSON.stringify(error)) )), // {"isTrusted":true}
          // catchError((error) => of( alert('Error from Websocket Listener => ' + error) )), // [object CloseEvent]
          catchError((error) => { if (error.code === 1006) { return of(new WebsocketConnectionClosed(error)); } else { alert('Error from Websocket Listener other than 1006 error.code => ' + error); } } )  , // [object CloseEvent]
      ) ),
  );

  @Effect({ dispatch: false })
  RequestUserTasks: Observable<any> = this.actions.pipe(
    ofType(TasksActionTypes.REQUEST_USER_TASKS),
    map(() => this.websocketService.socket$.next({ 'type': 'view.tasks' }) ),
  );

  @Effect({ dispatch: false })
  ReceivedUserTasks: Observable<any> = this.actions.pipe(
    ofType(TasksActionTypes.RECEIVED_USER_TASKS),
    tap((msgfromServer: ReceivedUserTasks) => this.tasksService.tasks = JSON.parse(msgfromServer.payload) ),
    // tap((msg) => console.log(msg) ),
  );

}

