import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../layout/content/content.component';
const routes: Routes = [
  { path: '', redirectTo: 'blog', component: ContentComponent, children: [
    // {
    //   path: 'movies',
    //   loadChildren: () => import('../containers/movies/movies.module').then(m => m.MoviesListModule),
    // }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
