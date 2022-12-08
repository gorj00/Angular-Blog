import { createActionGroup, emptyProps } from '@ngrx/store';
import { ITag, INewTag } from '../../../models/blog.models';

enum actionTypes {
  TAGS_LIST_REQUEST = 'TAGS_LIST_REQUEST',
  TAGS_LIST_RESPONSE = 'TAGS_LIST_RESPONSE',
  TAGS_LIST_FAILURE = 'TAGS_LIST_FAILURE',

  CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST',
  CREATE_TAG_RESPONSE = 'CREATE_TAG_RESPONSE',
  CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE',

  UPDATE_TAG_REQUEST = 'UPDATE_TAG_REQUEST',
  UPDATE_TAG_RESPONSE = 'UPDATE_TAG_RESPONSE',
  UPDATE_TAG_FAILURE = 'UPDATE_TAG_FAILURE',
}

export const BlogActions = createActionGroup({
  source: '[TAGS]',
  events: {
    [actionTypes.TAGS_LIST_REQUEST]: emptyProps(),
    [actionTypes.TAGS_LIST_RESPONSE]: (items: ITag[], total: number) => ({ items, total }),
    [actionTypes.TAGS_LIST_FAILURE]: (error: any) => ({ error }),

    [actionTypes.CREATE_TAG_REQUEST]: (newTag: INewTag) => ({ newTag }),
    [actionTypes.CREATE_TAG_RESPONSE]: (item: ITag) => ({ item }),
    [actionTypes.CREATE_TAG_FAILURE]: (error: any) => ({ error }),

    [actionTypes.UPDATE_TAG_REQUEST]: (proposedTag: ITag) => ({ proposedTag }),
    [actionTypes.UPDATE_TAG_RESPONSE]: (updatedTag: ITag) => ({ updatedTag }),
    [actionTypes.UPDATE_TAG_FAILURE]: (error: any) => ({ error }),
  }
});
