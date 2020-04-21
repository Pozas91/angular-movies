import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromApp} from '../../reducers';
import {Subject} from 'rxjs';
import {Movie} from '../models';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  moviesChanged = new Subject<Movie[]>();

  constructor(private store: Store<fromApp.AppState>) {
  }

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
  }

  getMovies() {
    return this.movies.slice();
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesChanged.next(this.movies.slice());
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());
  }
}
