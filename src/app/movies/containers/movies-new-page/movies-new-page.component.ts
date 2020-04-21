import {Component, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../reducers';
import {NgForm} from '@angular/forms';
import {MoviesActions} from '../../actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movies-new-page',
  templateUrl: './movies-new-page.component.html',
  styleUrls: ['./movies-new-page.component.scss']
})
export class MoviesNewPageComponent implements OnInit {
  isLoading = false;
  error: string = null;
  icons = {
    plus: faPlus
  };

  movie = {
    title: ''
  };

  constructor(private store: Store<fromApp.AppState>, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.store.dispatch(new MoviesActions.AddMovie(form.value));

    form.reset();

    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
