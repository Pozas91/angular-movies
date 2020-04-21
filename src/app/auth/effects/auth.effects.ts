import {User} from '../models';
import {AuthActions} from '../actions';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  displayName: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (expiresIn: number, name: string, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(name, email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    name, email, userId, token, expirationDate, redirect: true
  });
};

const handlerError = (errorRes: any) => {
  let errorMessage = 'Oops! Something go wrong';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct';
      break;
  }

  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.REGISTER_START),
    switchMap((signUpAction: AuthActions.RegisterStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
          email: signUpAction.payload.email,
          password: signUpAction.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        // Success Handling
        map(resData => {
          return handleAuthentication(+resData.expiresIn, resData.displayName, resData.email, resData.localId, resData.idToken);
        }),
        // Error Handling
        catchError(errorRes => handlerError(errorRes))
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        // Success Handling
        map(resData => {
          return handleAuthentication(+resData.expiresIn, resData.displayName, resData.email, resData.localId, resData.idToken);
        }),
        // Error Handling
        catchError(errorRes => handlerError(errorRes)),
      );
    }),
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {

      const userData: {
        name: string; email: string; id: string; _token: string; _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return {
          type: 'DUMMY'
        };
      }

      const loadedUser = new User(
        userData.name,
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {

        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);

        return new AuthActions.AuthenticateSuccess({
          name: loadedUser.name,
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: true
        });
      }

      return {
        type: 'DUMMY'
      };
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth/login']);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService) {
  }
}
