import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from './core/containers/not-found-page/not-found-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/movies-page', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: '**', component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
