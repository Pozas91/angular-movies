import {Movie} from '../models';
import {MoviesActions} from '../actions';

export interface State {
  movies: Movie[];
  loading: boolean;
}

const initialState: State = {
  movies: [],
  loading: false
};

export function moviesReducer(state = initialState, action: MoviesActions.MoviesActions) {
  switch (action.type) {
    case MoviesActions.GET_MOVIES:

      return {
        ...state,
        loading: false
      };
    case MoviesActions.ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload]
      };
    case MoviesActions.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
