import { TagsActions } from './tags.actions';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ITag, ITagsState } from '../../../models/blog.models'

const initialState: ITagsState = {
  tags: [],
  tagsTotal: null,
  loading: false,
  errors: null,
};

export const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialState,
    on(
      TagsActions.tags_list_request ||
      TagsActions.create_tag_request ||
      TagsActions.update_tag_request
    , (state: ITagsState) => ({
      ...state,
      loading: true,
    })),
    on(TagsActions.tags_list_response, (state: ITagsState, { items, total }) => ({
      ...state,
      loading: false,
      tags: items,
      tagsTotal: total,
    })),
    on(
      TagsActions.create_tag_response ||
      TagsActions.update_tag_response
    , (state: ITagsState) => ({
      ...state,
      loading: false,
    })),
    on(
      TagsActions.create_tag_failure ||
      TagsActions.tags_list_failure ||
      TagsActions.update_tag_failure
    , (state: ITagsState, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});

export const {
  name,
  reducer,
  selectTagsState,

  // + AUTO GENERATED SELECTORS
  } = tagsFeature
