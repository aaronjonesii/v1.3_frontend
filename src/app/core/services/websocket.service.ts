import { Injectable } from '@angular/core';
import { Token } from '../../shared/models/tokens';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../../environments/environment';

// const BASE_URL = 'ws://localhost:8000/ws/tasks/';
// const BASE_URL = 'ws://api.anonsys.tech/ws/tasks/';
const WEBSOCKET_URL: string = 'ws://' + environment.BACKEND_DOMAIN + '/ws/tasks/';

export interface Message {
  type: string;
  data?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // Pass token in query string
  token: Token;
  public socket$;

  constructor() { }

  initializeWebsocketConnection() {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.socket$ = webSocket(WEBSOCKET_URL + '?token=' + this.token.access);
  }

}
