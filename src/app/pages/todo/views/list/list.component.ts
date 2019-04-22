import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectTasksState } from '../../../../app.state';
import { Observable } from 'rxjs';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'anon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListViewComponent implements OnInit {

  getState: Observable<any>;
  errorMessage = null;
  tasks: any; // Tasks[]; // TODO: Make value same as the store's tasks using select in the constructor

  show_backlog = true;
  show_up_next: boolean;
  show_todo: boolean;
  show_in_progress = true;
  show_completed = true;

  constructor(
      private store: Store<AppState>,
      private sidebarService: NbSidebarService,
  ) {
    this.getState = this.store.select(selectTasksState);

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
      this.tasks = state.tasks;
    });
  }

  ngOnInit() {
    this.sidebarService.collapse('todo-sidebar');
  }

}
