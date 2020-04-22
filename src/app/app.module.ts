import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './core/containers/app/app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StoreModule} from '@ngrx/store';
import {FormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {fromApp} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {CoreModule} from './core/core.module';
import {AuthModule} from './auth/auth.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {MoviesModule} from './movies/movies.module';
import localeEs from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    // Libraries
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    // Modules
    CoreModule,
    SharedModule,
    AuthModule,
    MoviesModule,
    AppRoutingModule,
    // Development
    StoreDevtoolsModule.instrument({
      name: 'Movies App',
      logOnly: environment.production
    }),
    // Store & Actions
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
