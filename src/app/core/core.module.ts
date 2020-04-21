import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from '../auth/services/auth-interceptor.service';
import {NotFoundPageComponent} from './containers/not-found-page/not-found-page.component';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AppComponent} from './containers/app/app.component';
import {NavBarComponent} from './components/navbar/nav-bar.component';
import {LayoutComponent} from './components/layout/layout.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  NavBarComponent,
  LayoutComponent
];

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {
}
