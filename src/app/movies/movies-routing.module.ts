import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesIndexPageComponent} from './containers/movies-index-page/movies-index-page.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {MoviesNewPageComponent} from './containers/movies-new-page/movies-new-page.component';
import {MoviesPageComponent} from './containers/movies-page/movies-page.component';

const routes: Routes = [
  {
    path: '', component: MoviesPageComponent, canActivate: [AuthGuard], children: [
      {path: '', component: MoviesIndexPageComponent},
      {path: 'new', component: MoviesNewPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {
}
