import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieComponent} from './components/movie/movie.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MoviesIndexPageComponent} from './containers/movies-index-page/movies-index-page.component';
import {RouterModule} from '@angular/router';
import {MoviesRoutingModule} from './movies-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {MoviesEffects} from './effects/movies.effects';
import {MoviesNewPageComponent} from './containers/movies-new-page/movies-new-page.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {MoviesPageComponent} from './containers/movies-page/movies-page.component';

export const COMPONENTS = [
  MovieComponent,
  MoviesPageComponent,
  MoviesIndexPageComponent,
  MoviesNewPageComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    MoviesRoutingModule,
    EffectsModule.forFeature([MoviesEffects]),
    SharedModule,
    FormsModule
  ]
})
export class MoviesModule {
}
