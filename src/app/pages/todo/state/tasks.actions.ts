import { Action } from '@ngrx/store';


export enum TasksActionTypes {
  INITIALIZE_WEBSOCKET_CONNECTION     =   '[WEBSOCKET] Initialize Websocket Connection',
  WEBSOCKET_CONNECTION_ESTABLISHED    =   '[WEBSOCKET] Websocket Connection Established',
  WEBSOCKET_CONNECTION_FAILED         =   '[WEBSOCKET] Websocket Connection Failed',
  WEBSOCKET_CONNECTION_CLOSED         =   '[WEBSOCKET] Websocket Connection Closed',
  WEBSOCKET_LISTENER                  =   '[WEBSOCKET] Websocket Listener',
  REQUEST_USER_TASKS                  =   '[TASKS] Request User Tasks',
  RECEIVED_USER_TASKS                 =   '[TASKS] Received User Tasks',
}

export class InitializeWebsocketConnection implements Action { readonly type = TasksActionTypes.INITIALIZE_WEBSOCKET_CONNECTION; }
export class WebsocketConnectionEstablished implements Action { readonly type = TasksActionTypes.WEBSOCKET_CONNECTION_ESTABLISHED; }
export class WebsocketConnectionFailed implements Action { readonly type = TasksActionTypes.WEBSOCKET_CONNECTION_FAILED; }
export class WebsocketConnectionClosed implements Action { readonly type = TasksActionTypes.WEBSOCKET_CONNECTION_CLOSED; constructor(public payload: any) { } }
export class WebsocketListener implements Action { readonly type = TasksActionTypes.WEBSOCKET_LISTENER; }
export class RequestUserTasks implements Action { readonly type = TasksActionTypes.REQUEST_USER_TASKS; }
export class ReceivedUserTasks implements Action { readonly type = TasksActionTypes.RECEIVED_USER_TASKS; constructor(public payload: any) { } }


export type All =
  | InitializeWebsocketConnection
  | WebsocketConnectionEstablished
  | WebsocketConnectionFailed
  | WebsocketConnectionClosed
  | WebsocketListener
  | RequestUserTasks
  | ReceivedUserTasks;
