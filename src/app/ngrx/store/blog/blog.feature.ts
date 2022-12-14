import { BlogActions } from './blog.actions';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ITag, ITagsState } from '../../../models/blog.models'

const initialState: ITagsState = {
  tags: [],
  tagsById: {},
  tagsTotal: null,
  loading: false,
  errors: null,
};

export const blogFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialState,
    on(
      BlogActions.tags_list_request ||
      BlogActions.create_tag_request ||
      BlogActions.update_tag_request ||
      BlogActions.add_tag_to_blogpost_request
    , (state: ITagsState) => ({
      ...state,
      loading: true,
    })),
    on(BlogActions.tags_list_response, (state: ITagsState, { items, itemsById, total }) => ({
      ...state,
      loading: false,
      tags: items,
      tagsById:itemsById,
      tagsTotal: total,
    })),
    on(
      BlogActions.create_tag_response ||
      BlogActions.update_tag_response ||
      BlogActions.add_tag_to_blogpost_response
    , (state: ITagsState) => ({
      ...state,
      loading: false,
    })),
    on(
      BlogActions.create_tag_failure ||
      BlogActions.tags_list_failure ||
      BlogActions.update_tag_failure ||
      BlogActions.add_tag_to_blogpost_failure
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
  } = blogFeature
