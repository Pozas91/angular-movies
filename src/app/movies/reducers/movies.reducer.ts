import {Movie} from '../models';
import {MoviesActions} from '../actions';
import {on} from '@ngrx/store';

export interface State {
  movies: Movie[];
  loading: boolean;
  apiFeedback: string;
}

const initialState: State = {
  movies: [],
  loading: false,
  apiFeedback: '',
};

export function moviesReducer(state = initialState, action: MoviesActions.MoviesActions) {
  switch (action.type) {
    case MoviesActions.GET_MOVIES:
      return {
        ...state,
        loading: true
      };
    case MoviesActions.SET_MOVIES:
      return {
        ...state,
        movies: [...action.payload],
        loading: false
      };
    case MoviesActions.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie, index) => {
          return movie.id !== action.payload.id;
        })
      };
    case MoviesActions.API_ERROR:
      return {
        ...state,
        loading: false,
        apiFeedback: action.payload,
      };
    case MoviesActions.API_SUCCESS:
      return {
        ...state,
        loading: false,
        apiFeedback: action.payload,
      };
    default:
      return state;
  }
}
