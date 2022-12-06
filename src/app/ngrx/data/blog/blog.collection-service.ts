
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  EntityCollectionServiceFactory,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../../../models/blog.model';

@Injectable()
export class BlogCollectionService {
  blogService
  blogs$
  loading$
  constructor(EntityCollectionServiceFactory: EntityCollectionServiceFactory) {
    this.blogService = EntityCollectionServiceFactory.create<typeof BlogPost>('BlogPost');
    // this.filteredHeroes$ = this.heroService.filteredEntities$;
    this.loading$ = this.blogService.loading$;
    this.blogs$ = this.blogService.entities$
  }

  getBlogs() { this.blogService.getAll(); }
}
