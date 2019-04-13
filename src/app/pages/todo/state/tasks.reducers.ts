import { TasksActionTypes, All } from './tasks.actions';


export interface State {
  loading: boolean; // Loading?
  loaded: boolean; // Loaded?
  tasks: object | null; // To store user tasks from websocket
  errorMessage: string | null; // error Message
}

export const initialState: State = {
  loading: false,
  loaded: false,
  tasks: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    // Separartor
    case TasksActionTypes.INITIALIZE_WEBSOCKET_CONNECTION: { return { ...state, loading: true, loaded: false }; }
    case TasksActionTypes.WEBSOCKET_CONNECTION_ESTABLISHED: { return { ...state, loading: false, loaded: true }; }
    case TasksActionTypes.WEBSOCKET_CONNECTION_FAILED: { return { ...state, errorMessage: 'Failed to connect to websocket server' }; }
    case TasksActionTypes.WEBSOCKET_CONNECTION_CLOSED: { return { ...state, errorMessage: 'Websocket connection closed' }; }
    case TasksActionTypes.WEBSOCKET_LISTENER: { return { ...state, }; }
    // Separator
    case TasksActionTypes.REQUEST_USER_TASKS: { return { ...state, loading: true, loaded: false }; }
    case TasksActionTypes.RECEIVED_USER_TASKS: { return { ...state, loading: false, loaded: true, tasks: JSON.parse(action.payload), errorMessage: null }; }
    // Separator
    default: { return state; }
  }

}
