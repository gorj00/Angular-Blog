import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MoviesListComponent } from './movies-list/movies-list.component'
// import { MoviesSidebarComponent } from './movies-sidebar/movies-sidebar.component'

const routes: Routes = [


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesListRoutingModule { }
