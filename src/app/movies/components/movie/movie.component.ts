import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../models';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {fromApp} from '../../../reducers';
import {Store} from '@ngrx/store';
import {MoviesActions} from '../../actions';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  icons = {
    trash: faTrash
  };

  constructor(private store: Store<fromApp.AppState>) {
  }

  onDeleteMovie() {
    this.store.dispatch(new MoviesActions.DeleteMovie(this.movie));
  }

  ngOnInit(): void {
  }
}
