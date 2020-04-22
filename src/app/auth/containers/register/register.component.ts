import {Component, OnDestroy, OnInit} from '@angular/core';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {fromApp} from '../../../reducers';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthActions} from '../../actions';

export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (confirmPassword.errors && !confirmPassword.errors.confirmed) {
    // Return if another validator has already found an error on the confirmControl
    return;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({confirmed: true});
  } else {
    confirmPassword.setErrors(null);
  }
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  registerForm: FormGroup;

  isLoading = false;
  error: string = null;
  icons = {userPlus: faUserPlus};

  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    check: false
  };

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });

    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      confirmPassword: new FormControl(this.user.confirmPassword, [
        Validators.required,
        Validators.minLength(4),
      ]),
      check: new FormControl(this.user.check, [
        Validators.required
      ])
    }, {validators: confirmPasswordValidator});
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    this.store.dispatch(new AuthActions.RegisterStart({name, email, password}));

    this.registerForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  // Form getters
  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get check() {
    return this.registerForm.get('check');
  }
}
