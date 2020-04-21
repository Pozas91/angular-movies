import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MoviesActions} from '../actions';
import {Movie} from '../models';
import {environment} from '../../../environments/environment';
import {fromApp} from '../../reducers';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';

const handlerError = (errorRes: any) => {
  const errorMessage = 'Oops! Something go wrong';
  return of(new MoviesActions.ApiError(errorMessage));
};

@Injectable()
export class MoviesEffects {

  @Effect()
  getMovies = this.actions$.pipe(
    ofType(MoviesActions.GET_MOVIES),
    switchMap(() => {
      return this.http.get<Movie[]>(
        environment.baseUrlApi + '/movies.json',
      ).pipe(
        catchError(errorRes => handlerError(errorRes))
      );
    }),
    map(movies => {
      return Object.keys(movies).map(key => {
        return {
          ...movies[key],
          id: key
        };
      });
    }),
    map(movies => {
      return new MoviesActions.SetMovies(movies);
    })
  );

  @Effect({dispatch: false})
  deleteMovie = this.actions$.pipe(
    ofType(MoviesActions.DELETE_MOVIE),
    switchMap((actionDeleteMovie: MoviesActions.DeleteMovie) => {
      return this.http.delete(
        environment.baseUrlApi + '/movies/' + actionDeleteMovie.payload.id + '.json'
      ).pipe(
        catchError(errorRes => handlerError(errorRes))
      );
    })
  );

  @Effect()
  addMovie = this.actions$.pipe(
    ofType(MoviesActions.ADD_MOVIE),
    withLatestFrom(this.store.select('auth')),
    switchMap(([addMovieAction, authState]) => {
      const action: MoviesActions.AddMovie = addMovieAction;

      return this.http.post(
        environment.baseUrlApi + '/movies.json',
        {
          owner: authState.user.id,
          title: action.payload.title
        }
      ).pipe(
        catchError(errorRes => handlerError(errorRes))
      );
    }),
    map(() => new MoviesActions.GetMovies())
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }
}
