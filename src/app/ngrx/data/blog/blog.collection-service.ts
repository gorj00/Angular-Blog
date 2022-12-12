import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceFactory,
  EntityOp
} from '@ngrx/data';
import { BlogPostDataService } from './blog-post.data-service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IBlogPost } from '../../../models/blog.models';
import { Store } from '@ngrx/store';
import { selectedSelectedBlogPost } from './blog.entity-selectors';
import { IAppState } from 'src/app/models/state.models';

@Injectable()
export class BlogCollectionService {
  blogService
  blogs$: Observable<IBlogPost[]>
  selectedBlog$: Observable<IBlogPost | null>
  blogsCount$
  loading$


  constructor(
    EntityCollectionServiceFactory: EntityCollectionServiceFactory,
    private blogPostDataService: BlogPostDataService,
    private store: Store<IAppState>,
  ) {
    this.blogService = EntityCollectionServiceFactory.create<IBlogPost>('BlogPost');

    this.loading$ = this.blogService.loading$;
    this.blogs$ = this.blogService.entities$
    this.blogsCount$ = this.blogService.count$
    this.selectedBlog$ = this.store.select(selectedSelectedBlogPost).pipe(
      map(blogPost => blogPost ? blogPost : null)
    )
  }

  getBlogPosts() { this.blogService.getAll(); }
  getBlogPostById(id: number) {
    return this.blogService.getByKey(id);
  }
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

  // ENTITY ACTIONS CALLED IN BLOG EFFECTS
  dispatchCSBlogPostFetchByIdForEffect(id: number) {
    return this.blogService.createEntityAction(EntityOp.QUERY_BY_KEY, id)
  }

  dispatchCSBlogPostsFetchForEffect() {
    return this.blogService.createEntityAction(EntityOp.QUERY_ALL)
  }
}
