import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MoviesListComponent } from './movies-list/movies-list.component'
// import { MoviesSidebarComponent } from './movies-sidebar/movies-sidebar.component'
import { BlogPostsComponent } from './blog-posts/blog.posts.component'

const routes: Routes = [
  { path: '', component: BlogPostsComponent},
  { path: '', component: BlogPostsComponent, outlet: 'sidebar'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
