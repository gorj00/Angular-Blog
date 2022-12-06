import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects'
import { HttpService } from '../../services/http.service'
import { StoreModule } from '@ngrx/store'
import { SharedModule } from '../../modules/shared.module'
import { BlogRoutingModule } from './blog-routing.module'
import { EntityDefinitionService, HttpUrlGenerator, EntityDataService, EntityServices  } from '@ngrx/data'
import { blogEntityMetadata } from '../../ngrx/data/blog/blog.entity-metadata'
import { BlogPostDataService } from 'src/app/ngrx/data/blog/blog-post.data-service';
import { BlogHttpUrlGenerator } from 'src/app/ngrx/data/blog/blog.url-generator'
import { BlogPostsComponent } from './blog-posts/blog.posts.component'
import { BlogCollectionService } from 'src/app/ngrx/data/blog/blog.collection-service';
@NgModule({
  declarations: [
    BlogPostsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    // StoreModule.forFeature(moviesFeature),
    // EffectsModule.forFeature([MoviesEffects]),
  ],
  providers: [
    HttpService,
    { provide: 'apiUrl', useValue: 'https://endevel-task.doc.endevel.cz/' },
    { provide: HttpUrlGenerator, useClass: BlogHttpUrlGenerator },
    BlogPostDataService,
    BlogCollectionService,
  ],
  bootstrap: []
})
export class BlogModule {
  constructor(
    eds: EntityDefinitionService,
    eDataS: EntityDataService,
    blogPostDataService: BlogPostDataService,
  ) {
    // Lazily egistered @ngrx/data classes
    eds.registerMetadataMap(blogEntityMetadata);
    eDataS.registerService('BlogPost', blogPostDataService);
  }
 }
