import {Component, OnDestroy, OnInit} from '@angular/core';
import {faPowerOff, faSignInAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {AuthActions} from '../../../auth/actions';
import {fromApp} from '../../../reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  icons = {userPlus: faUserPlus, signInAlt: faSignInAlt, powerOff: faPowerOff};
  isAuth = false;
  private userSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(
      map(authState => {
        return authState.user;
      })
    ).subscribe(user => {
      this.isAuth = !!user;
    });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
