import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BlogPostsComponent } from './blog-posts/blog.posts.component'
import { BlogSidebarComponent } from './blog-sidebar/blog-sidebar.component'
import { BlogPostComponent } from './blog-post/blog-post.component'

const routes: Routes = [
  { path: '', component: BlogSidebarComponent, outlet: 'sidebar'},
  { path: '', component: BlogPostsComponent },
  { path: ':blogPostId', component: BlogPostComponent },
  // { path: '/new', component: BlogPostsComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
