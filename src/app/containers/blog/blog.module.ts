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
import { BlogEffects } from 'src/app/ngrx/store/blog/blog.effects';
import { blogFeature } from 'src/app/ngrx/store/blog/blog.feature';
import { BlogService } from 'src/app/services/blog.service';
import { BlogDataService } from './blog-dara.service';
@NgModule({
  declarations: [
    BlogPostsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    StoreModule.forFeature(blogFeature),
    EffectsModule.forFeature([BlogEffects]),
  ],
  providers: [
    HttpService,
    BlogService,
    { provide: 'apiUrl', useValue: 'https://endevel-task.doc.endevel.cz/' },
    { provide: HttpUrlGenerator, useClass: BlogHttpUrlGenerator },
    // BlogPostDataService,
    BlogCollectionService,
    BlogDataService,
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
