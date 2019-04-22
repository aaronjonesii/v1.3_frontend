import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectTasksState} from '../../../../app.state';
import {InitializeWebsocketConnection, WebsocketListener} from '../../state/tasks.actions';

@Component({
  selector: 'anon-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardViewComponent implements OnInit {

  getState: Observable<any>;
  errorMessage = null;
  tasks: any; // Tasks[]; // TODO: Make value same as the store's tasks using select in the constructor

  constructor(
      private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectTasksState);

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.tasks = state.tasks;
    });

  }

  ngOnInit() {
  }

}
