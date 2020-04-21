import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../../models';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../reducers';
import {map} from 'rxjs/operators';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {MoviesActions} from '../../actions';
import {User} from '../../../auth/models';

@Component({
  selector: 'app-movies',
  templateUrl: './movies-index-page.component.html',
  styleUrls: ['./movies-index-page.component.scss']
})
export class MoviesIndexPageComponent implements OnInit, OnDestroy {
  isLoading = false;
  movies: Movie[];
  storeSub: Subscription;
  icons = {plus: faPlus};
  user: User = null;
  alert = {message: null};

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new MoviesActions.GetMovies());

    this.storeSub = this.store.select('movies')
      .subscribe(moviesState => {
        this.movies = moviesState.movies;
        this.isLoading = moviesState.loading;
        // this.alert.message = moviesState.apiFeedback;
      });

    this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
