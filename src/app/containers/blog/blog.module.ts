import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '../../modules/material.module'
// import { MoviesListComponent } from './movies-list/movies-list.component'
// import { MoviesSidebarComponent } from './movies-sidebar/movies-sidebar.component'
import { EffectsModule } from '@ngrx/effects'
// import { MoviesEffects } from '../../store/movies/movies.effects'
import { MoviesService } from '../../services/movies.service'
import { HttpService } from '../../services/http.service'
import { StoreModule } from '@ngrx/store'
import { SharedModule } from '../../modules/shared.module'
// import { moviesFeature } from '../../store/movies/movies.feature'
// import { MoviesDataService } from './movies-data.service'
import { BlogRoutingModule } from './blog-routing.module'
import { EntityDefinitionService, HttpUrlGenerator, EntityDataService, EntityCollectionReducerRegistry  } from '@ngrx/data'
import { blogEntityMetadata } from '../../ngrx/data/blog/blog.entity-metadata'
import { BlogPostDataService } from 'src/app/ngrx/data/blog/blog-post.data-service';
import { BlogHttpUrlGenerator } from 'src/app/ngrx/data/blog/blog.url-generator'
import { BlogPostsComponent } from './blog-posts/blog.posts.component'
@NgModule({
  declarations: [
    // MoviesListComponent,
    // MoviesSidebarComponent,
    BlogPostsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogRoutingModule,
    // CoreModule,
    // MoviesListRoutingModule,
    // MaterialModule,
    // StoreModule.forFeature(moviesFeature),
    // EffectsModule.forFeature([MoviesEffects]),
    // EntityDataModule.forRoot({}),
  ],
  providers: [
    HttpService,
    // MoviesService,
    // MoviesDataService,
    { provide: 'apiUrl', useValue: 'https://endevel-task.doc.endevel.cz/' },
    { provide: HttpUrlGenerator, useClass: BlogHttpUrlGenerator },
    BlogPostDataService,
  ],
  bootstrap: []
})
export class BlogModule {
  constructor(eds: EntityDefinitionService, eDataS: EntityDataService, blogPostDataService: BlogPostDataService ) {
    // Lazily egistered @ngrx/data classes
    eds.registerMetadataMap(blogEntityMetadata);
    eDataS.registerService('BlogPost', blogPostDataService);
  }
 }
