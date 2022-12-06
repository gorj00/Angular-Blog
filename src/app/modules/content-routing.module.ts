import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from '../layout/content/content.component';
// import { BlogModule } from '../containers/blog/blog.module';
const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full'},
  { path: '', component: ContentComponent, children: [
    {
      path: 'blog',
      loadChildren: () => import('../containers/blog/blog.module').then(m => m.BlogModule),
    }
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
