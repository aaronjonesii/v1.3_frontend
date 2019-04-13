import * as auth from './shared/auth/state/auth.reducer';
import * as tasks from './pages/todo/state/tasks.reducers';
import { createFeatureSelector } from '@ngrx/store';
import { RouterState } from '@angular/router';
import { routerReducer } from '@ngrx/router-store';

export interface AppState {
  authState: auth.State;
  tasksState: tasks.State;
  router: RouterState;
}

export const reducers = { auth: auth.reducer, tasks: tasks.reducer, router: routerReducer };

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectTasksState = createFeatureSelector<AppState>('tasks');
