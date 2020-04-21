import {Component, OnDestroy, OnInit} from '@angular/core';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../reducers';
import {NgForm} from '@angular/forms';
import {AuthActions} from '../../actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string = null;
  icons = {userPlus: faUserPlus};
  user = {
    name: '',
    email: '',
    password: ''
  };

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.RegisterStart({name, email, password}));

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

}
