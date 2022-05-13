import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'movielist',
    loadChildren: () => import('./movielist/movielist.module').then( m => m.MovielistPageModule)
  },
  {
    path: 'moviedetails',
    loadChildren: () => import('./moviedetails/moviedetails.module').then( m => m.MoviedetailsPageModule)
  },
  {
    path: 'moviedetails/:id',
    loadChildren: () => import('./moviedetails/moviedetails.module').then( m => m.MoviedetailsPageModule)
  },
  {
    path: 'movie',
    loadChildren: () => import('./movie/movie.module').then( m => m.MoviePageModule)
  },
  {
    path: 'addmovie',
    loadChildren: () => import('./addmovie/addmovie.module').then( m => m.AddmoviePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
