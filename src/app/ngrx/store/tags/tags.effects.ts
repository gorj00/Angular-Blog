import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators'
import { TagsService } from '../../../services/tags.service';
import { TagsActions } from './tags.actions';
import { of } from 'rxjs';

@Injectable()
export class TagsEffects {
  fetchTagsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.tags_list_request),
      mergeMap(() => this.tagsService.getTagsList()
        .pipe(
          map((tags) =>
            TagsActions.tags_list_response(tags, tags?.length ? tags.length : 0)
          ),
          catchError((error) => of(TagsActions.tags_list_failure(error)))
        )
      )
    )
  );

  createNewTagEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.create_tag_request),
      mergeMap(({ newTag }) => this.tagsService.createTag(newTag)
        .pipe(
          map((newTag) => TagsActions.create_tag_response(newTag)),
          catchError((error) => of(TagsActions.create_tag_failure(error)))
        )
      )
    )
  );

  updateTagEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TagsActions.update_tag_request),
      mergeMap(({ proposedTag }) => this.tagsService.updateTag(proposedTag)
        .pipe(
          map((updatedTag) => TagsActions.update_tag_response(updatedTag)),
          catchError((error) => of(TagsActions.update_tag_failure(error)))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private tagsService: TagsService
  ) {}
}
