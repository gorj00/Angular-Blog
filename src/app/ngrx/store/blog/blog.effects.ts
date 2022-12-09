import { ITag } from './../../../models/blog.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { BlogService } from '../../../services/blog.service';
import { BlogActions } from './blog.actions';
import { of } from 'rxjs';
import { Action } from '@ngrx/store';
import { OnInitEffects } from '@ngrx/effects';

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
          map((newTag) => BlogActions.create_tag_response(newTag)),
          catchError((error) => of(BlogActions.create_tag_failure(error)))
        )
      )
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


  constructor(
    private actions$: Actions,
    private blogService: BlogService
  ) {}
}
