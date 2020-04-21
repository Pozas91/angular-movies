import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MoviesActions} from '../actions';
import {Movie} from '../models';
import {environment} from '../../../environments/environment';
import {fromApp} from '../../reducers';
import {Store} from '@ngrx/store';

@Injectable()
export class MoviesEffects {

  @Effect()
  getMovies = this.actions$.pipe(
    ofType(MoviesActions.GET_MOVIES),
    switchMap(() => {
      return this.http.get<Movie[]>(
        environment.baseUrlApi + '/movies.json',
      );
    }),
    map(movies => {
      return new MoviesActions.SetMovies(movies);
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
      );
    }),
    map(() => {
      return new MoviesActions.GetMovies();
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }
}
