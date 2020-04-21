import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../reducers';
import {AuthActions} from '../../../auth/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
