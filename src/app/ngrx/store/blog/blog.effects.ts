import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { BlogService } from '../../../services/blog.service';
import { BlogActions } from './blog.actions';
import { of } from 'rxjs';

@Injectable()
export class BlogEffects {
  fetchTagsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.tags_list_request),
      mergeMap(() => this.blogService.getTagsList()
        .pipe(
          map((tags) =>
            BlogActions.tags_list_response(tags, tags?.length ? tags.length : 0)
          ),
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
