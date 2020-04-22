import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './containers/login/login.component';
import {RegisterComponent} from './containers/register/register.component';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './effects/auth.effects';
import {AuthRoutingModule} from './auth-routing.module';

export const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
];

@NgModule({
  declarations: COMPONENTS,
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        SharedModule,
        EffectsModule.forFeature([AuthEffects]),
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule {
}
