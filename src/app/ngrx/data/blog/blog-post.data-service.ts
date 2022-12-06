import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogPost } from '../../../models/blog.model';
import { BlogHttpUrlGenerator } from './blog.url-generator';
@Injectable()
export class BlogPostDataService extends DefaultDataService<typeof BlogPost> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('BlogPost', http, httpUrlGenerator);
    logger.log('Created custom BlogPost EntityDataService');
  }

  override getAll(): Observable<typeof BlogPost[]> {
    return super.getAll().pipe(map(blogs => {console.log(blogs); return blogs;}))
    // return super.getAll().pipe(map(blogs => blogs.map(blog => this.mapBlogPost(blog))))

  }

  // getById(id: string | number): Observable<Hero> {
  //   return super.getById(id).pipe(map(hero => this.mapHero(hero)));
  // }

  // getWithQuery(params: string | QueryParams): Observable<Hero[]> {
  //   return super.getWithQuery(params).pipe(map(heroes => heroes.map(hero => this.mapHero(hero))));
  // }

  // private mapHero(hero: Hero): Hero {
  //   return { ...hero, dateLoaded: new Date() };
  // }
}
