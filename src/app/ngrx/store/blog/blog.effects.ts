import { IBlogPost } from 'src/app/models/blog.models';
import { switchMap, combineLatest } from 'rxjs';
import { ITag } from './../../../models/blog.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, filter } from 'rxjs/operators'
import { BlogService } from '../../../services/blog.service';
import { BlogActions } from './blog.actions';
import { BlogCollectionService } from '../../data/blog/blog.collection-service';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';
import { OnInitEffects } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { IRouterNavigationAction } from 'src/app/models/router.models';

@Injectable()
export class BlogEffects implements OnInitEffects {

  // MODULE INIT EFFECTS
  // ROOT_EFFECTS_INIT not working for lazily loaded modules, works only forRoot() EffectsModule
  ngrxOnInitEffects(): Action {
    return BlogActions.blog_module_init();
  }

  blogModuleInitialFetchEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.blog_module_init),
      map(() => BlogActions.tags_list_request())
    )
  );

  // REGULAR EFFECTS
  fetchTagsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.tags_list_request),
      mergeMap(() => this.blogService.getTagsList()
        .pipe(
          map((tags) => {
            const tagsById: {[key: number]: ITag} = {}
            tags.length && tags.forEach((item: ITag) => (tagsById[item.id] = item))
            return BlogActions.tags_list_response(tags, tagsById, tags?.length ? tags.length : 0)
          }),
          catchError((error) => of(BlogActions.tags_list_failure(error)))
        )
      )
    )
  );

  createNewTagEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.create_tag_request),
      mergeMap(({ newTag }) => this.blogService.createTag(newTag)
        .pipe(
          mergeMap((newTag) => [
            BlogActions.create_tag_response(newTag),
            BlogActions.tags_list_request(),
          ]),
          catchError((error) => of(BlogActions.create_tag_failure(error)))
        )
      )
    )
  );

  addTagToBlogPostEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.add_tag_to_blogpost_request),
      mergeMap(({ tagId, blogPostId }) => this.blogService.addTagToBlogPost(tagId, blogPostId)
        .pipe(
          mergeMap((updatedBlogPost) => [
            BlogActions.add_tag_to_blogpost_response(updatedBlogPost),
            this.blogCS.dispatchCSBlogPostsFetchForEffect(),
          ]),
          catchError((error) => of(BlogActions.add_tag_to_blogpost_failure(error)))
        )
      )
    )
  );

  addNewlyCreatedTagToSelectedBlogPostEffect$ = createEffect(() =>
  combineLatest([
    // 1st action
    this.actions$.pipe(
      ofType(BlogActions.create_tag_response),
    ),
    // 2nd action
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      map((r: IRouterNavigationAction) => {
        const { payload: { routerState: { params } }} = r
        return params['blogPostId']
      }),
    ),
  ]).pipe(
    map(([{ item }, blogPostId]) => BlogActions.add_tag_to_blogpost_request(item.id, blogPostId) ),
  )
);

  updateTagEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.update_tag_request),
      mergeMap(({ proposedTag }) => this.blogService.updateTag(proposedTag)
        .pipe(
          map((updatedTag) => BlogActions.update_tag_response(updatedTag)),
          catchError((error) => of(BlogActions.update_tag_failure(error)))
        )
      )
    )
  );

  fetchBlogPostByIdBasedOnRouterEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: IRouterNavigationAction) => {
        const { payload: { routerState: { url, params } }} = r
        return url.startsWith('/blog/') && params['blogPostId']
      }),
      map((r: IRouterNavigationAction) => {
        const { payload: { routerState: { params } }} = r
        return params['blogPostId']
      }),
      map(id => this.blogCS.dispatchCSBlogPostFetchByIdForEffect(+id)),
    )
  );

  // Consider adding tags fetch as well, already handled initial fetch in ngrxOnInitEffects
  refetchBlogPostsBasedOnRouteEffect$= createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: IRouterNavigationAction) => {
        const { payload: { routerState: { url } }} = r
        return url === '/blog' || url === '/blog/'
      }),
      map(() => this.blogCS.dispatchCSBlogPostsFetchForEffect())
    )
  );

  constructor(
    private actions$: Actions,
    private blogService: BlogService,
    private blogCS: BlogCollectionService,
  ) {}
}
