
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  EntityCollectionServiceFactory,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams,
  EntityOp
} from '@ngrx/data';
import { BlogPostDataService } from './blog-post.data-service';
import { Observable } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
import { BlogPost, IBlogPost } from '../../../models/blog.models';

@Injectable()
export class BlogCollectionService {
  blogService
  blogs$: Observable<IBlogPost[]>
  loading$
  blogsCount$

  constructor(
    EntityCollectionServiceFactory: EntityCollectionServiceFactory,
    private blogPostDataService: BlogPostDataService,
  ) {
    this.blogService = EntityCollectionServiceFactory.create<IBlogPost>('BlogPost');

    this.loading$ = this.blogService.loading$;
    this.blogs$ = this.blogService.entities$
    this.blogsCount$ = this.blogService.count$
  }

  getBlogPosts() { this.blogService.getAll(); }
  getBlogPostById(id: number) { this.blogService.getByKey(id); }
  updateBlogPost(propsToUpdateWithIdObj: Partial<IBlogPost>) {
    this.blogService.update(propsToUpdateWithIdObj);
  }
  addTagToBlogPost(blogPostId: number, tagId: number) {
    if (blogPostId && tagId) {
      this.blogService.setLoaded(false)
      this.blogService.setLoading(true)
      this.blogPostDataService.addTagToBlogPost(blogPostId, tagId).pipe(
        tap((updatedBlogPost: IBlogPost) => {
          this.blogService.updateOneInCache(updatedBlogPost)
          this.blogService.setLoading(false)
          this.blogService.setLoaded(true)
        })
      ).subscribe()
    }
  }

  dispatchCSBlogPostFetchByIdForEffect(id: number) {
    return this.blogService.createEntityAction(EntityOp.QUERY_BY_KEY, id)
  }
}
