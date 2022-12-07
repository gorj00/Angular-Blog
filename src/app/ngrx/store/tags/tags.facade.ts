import { TagsActions } from './tags.actions';
import { ITagsState, INewTag, ITag } from './../../../models/blog.models';
import { tagsFeature } from './tags.feature';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class TagsFacade {
  tags$ = this.store.select(tagsFeature.selectTags)
  tagsTotal$ = this.store.select(tagsFeature.selectTagsTotal)
  tagsLoading$ = this.store.select(tagsFeature.selectLoading)
  tagsError$ = this.store.select(tagsFeature.selectErrors)

  constructor(private store: Store<ITagsState>) {}

  fetchTagsList() {
    this.store.dispatch(TagsActions.tags_list_request())
  }

  crateNewTag(newTag: INewTag) {
    this.store.dispatch(TagsActions.create_tag_request(newTag))
  }

  updateNewTag(proposedTag: ITag) {
    this.store.dispatch(TagsActions.update_tag_request(proposedTag))
  }

}
