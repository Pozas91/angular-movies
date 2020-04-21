import {ActionReducerMap} from '@ngrx/store';
import {fromAuth} from '../auth/reducers';
import {fromMovies} from '../movies/reducers';


export interface AppState {
  auth: fromAuth.State;
  movies: fromMovies.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  movies: fromMovies.moviesReducer
};
