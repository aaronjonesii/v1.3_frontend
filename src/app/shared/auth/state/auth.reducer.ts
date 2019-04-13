import { AuthActionTypes, All } from './auth.actions';
import { User } from '../../models/user';

export interface State {
  loading: boolean; // Loading?
  loaded: boolean; // Loaded?
  isAuthenticated: boolean; // User Logged In?
  user: User | null; // If authenticated, there should be a user object
  tasks: object | null; // To store user tasks from websocket
  errorMessage: string | null; // error Message
}

export const initialState: State = {
  loading: false,
  loaded: false,
  isAuthenticated: false,
  user: null,
  tasks: null,
  errorMessage: null
};


export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.CHECK_AUTHENTICATION: { return { ...state, loading: true}; }
    case AuthActionTypes.AUTHENTICATED: { return { ...state, }; }
    case AuthActionTypes.NOT_AUTHENTICATED: { return { ...state, loading: false, loaded: true, errorMessage: 'Login to access protected pages' }; }
    // Separartor
    case AuthActionTypes.CHECK_SESSION: { return { ...state, loading: true, loaded: false }; }
    case AuthActionTypes.SESSION_SUCCESS: { return { ...state, loading: false, loaded: true, isAuthenticated: true, errorMessage: null }; }
    case AuthActionTypes.SESSION_EXPIRED: { return { ...state, errorMessage: 'Session Expired, Refreshing now' }; }
    // Separartor
    case AuthActionTypes.REFRESH_SESSION: { return { ...state }; }
    case AuthActionTypes.REFRESH_SESSION_SUCCESS: { return { ...state, loading: false, errorMessage: null }; }
    case AuthActionTypes.REFRESH_SESSION_FAILURE: { return { ...state, errorMessage: 'Failed to Refresh Session, check access token.' }; }
    // Separartor
    case AuthActionTypes.GET_USER_INFO: { return { ...state, loading: true, loaded: false, }; }
    case AuthActionTypes.GET_USER_INFO_SUCCESS: { return { ...state, loading: false, loaded: true, user: action.payload, errorMessage: null }; }
    case AuthActionTypes.GET_USER_INFO_FAILURE: { return { ...state, errorMessage: 'Failed to get user info, refresh the webpage..' }; }
    // Separartor
    case AuthActionTypes.LOGIN: { return { ...state, loading: true, loaded: false }; }
    case AuthActionTypes.LOGIN_SUCCESS: { return { ...state, errorMessage: null }; }
    case AuthActionTypes.LOGIN_FAILURE: { return { ...state, errorMessage: 'Incorrect email and/or password.' }; }
    // Separartor
    case AuthActionTypes.SIGNUP: { return { ...state, loading: true, loaded: false }; }
    case AuthActionTypes.SIGNUP_SUCCESS: { return { ...state, errorMessage: null }; }
    case AuthActionTypes.SIGNUP_FAILURE: { return { ...state, errorMessage: 'That username is already in use.' }; }
    // Separator
    case AuthActionTypes.LOGOUT: { return initialState; }
    // Separartor
    case AuthActionTypes.INITIALIZE_WEBSOCKET_CONNECTION: { return { ...state, loading: true, loaded: false }; }
    case AuthActionTypes.WEBSOCKET_CONNECTION_ESTABLISHED: { return { ...state, loading: false, loaded: true }; }
    case AuthActionTypes.WEBSOCKET_CONNECTION_FAILED: { return { ...state, errorMessage: 'Failed to connect to websocket server' }; }
    case AuthActionTypes.WEBSOCKET_CONNECTION_CLOSED: { return { ...state, errorMessage: 'Websocket connection closed' }; }
    case AuthActionTypes.WEBSOCKET_LISTENER: { return { ...state, }; }
    // Separator
    case AuthActionTypes.REQUEST_USER_TASKS: { return { ...state, loading: true, loaded: false }; }
    case AuthActionTypes.RECEIVED_USER_TASKS: { return { ...state, loading: false, loaded: true, tasks: JSON.parse(action.payload), errorMessage: null }; }
    // Separator
    default: { return state; }
  }

}
