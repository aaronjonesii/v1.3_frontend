import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { Token } from '../../shared/models/tokens';
import { WebSocketSubject } from 'rxjs/webSocket';
import { webSocket } from 'rxjs/webSocket';

const BASE_URL = 'ws://localhost:8000/ws/tasks/';

interface Message {
  type: string;
  data?: string;
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
    this.socket$ = webSocket(BASE_URL + '?token=' + this.token.access);
  }

}
