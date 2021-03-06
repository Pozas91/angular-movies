import {Action} from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const REGISTER_START = '[Auth] Register Start';
export const LOGOUT = '[Auth] Logout';

export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';

export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: { name: string; email: string; userId: string; token: string; expirationDate: Date; redirect: boolean; }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string; }) {
  }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {
  }
}

export class RegisterStart implements Action {
  readonly type = REGISTER_START;

  constructor(public payload: { name: string, email: string, password: string }) {
  }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;

}

export type AuthActions =
  | AuthenticateSuccess
  | Logout
  | LoginStart
  | AuthenticateFail
  | RegisterStart
  | ClearError
  | AutoLogin;
