import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../../models';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../reducers';
import {map} from 'rxjs/operators';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {MoviesActions} from '../../actions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies-index-page.component.html',
  styleUrls: ['./movies-index-page.component.scss']
})
export class MoviesIndexPageComponent implements OnInit, OnDestroy {
  movies: Movie[];
  subscription: Subscription;
  icons = {plus: faPlus};

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new MoviesActions.GetMovies());

    this.subscription = this.store.select('movies')
      .pipe(
        map(moviesState => moviesState.movies)
      )
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
