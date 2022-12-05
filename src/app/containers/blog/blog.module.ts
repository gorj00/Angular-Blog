import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '../../modules/material.module'
import { MoviesListRoutingModule } from './movies-routing.module'
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
@NgModule({
  declarations: [
    // MoviesListComponent,
    // MoviesSidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // CoreModule,
    // MoviesListRoutingModule,
    // MaterialModule,
    // StoreModule.forFeature(moviesFeature),
    // EffectsModule.forFeature([MoviesEffects]),
  ],
  providers: [
    HttpService,
    // MoviesService,
    // MoviesDataService,
    {provide: 'apiUrl', useValue: 'https://endevel-task.doc.endevel.cz/'},
  ],
  bootstrap: []
})
export class BlogModule { }
