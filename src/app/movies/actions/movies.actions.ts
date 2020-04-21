import {Action} from '@ngrx/store';
import {Movie} from '../models';

export const SET_MOVIES = '[Movies] Set Movies';
export const GET_MOVIES = '[Movies] Get Movies';
export const ADD_MOVIE = '[Movies] Add Movie';
export const DELETE_MOVIE = '[Movies] Delete Movie';

export class SetMovies implements Action {
  readonly type = SET_MOVIES;

  constructor(public payload: Movie[]) {
  }
}

export class GetMovies implements Action {
  readonly type = GET_MOVIES;
}

export class AddMovie implements Action {
  readonly type = ADD_MOVIE;

  constructor(public payload: Movie) {
  }
}

export class DeleteMovie implements Action {
  readonly type = DELETE_MOVIE;

  constructor(public payload: number) {
  }
}

export type MoviesActions =
  | SetMovies
  | GetMovies
  | AddMovie
  | DeleteMovie;
