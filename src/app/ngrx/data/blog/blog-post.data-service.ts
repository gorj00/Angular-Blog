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
import { BlogPost } from '../../../models/blog.models';
import { BlogHttpUrlGenerator } from './blog.url-generator';

@Injectable({ providedIn: 'root'})
export class BlogPostDataService extends DefaultDataService<typeof BlogPost> {
  constructor(http: HttpClient, httpUrlGenerator: BlogHttpUrlGenerator, logger: Logger) {
    super('BlogPost', http, httpUrlGenerator);
    logger.log('Created custom BlogPost EntityDataService');
  }

  // CUSTOM METHODS APART FROM AUTO-CRETED BY COLLECTION SERVICE
  // Further handled in collection service
  addTagToBlogPost(blogPostId: number, tagId: number) {
    return this.execute(
      'PUT',
      `https://endevel-task.doc.endevel.cz/blog/${blogPostId}/add_tag/${tagId}/`,
    )
  }

}
