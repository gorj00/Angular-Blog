import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogPostsComponent } from './blog-posts/blog.posts.component'

const routes: Routes = [
  { path: '', component: BlogPostsComponent},
  // { path: '', component: BlogPostsComponent, outlet: 'sidebar'}
  // { path: '/:blogPostId', component: BlogPostsComponent, },
  // { path: '/:blogPostId/edit', component: BlogPostsComponent, },
  // { path: '/new', component: BlogPostsComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
