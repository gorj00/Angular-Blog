import { BlogActions } from './blog.actions';
import { ITagsState, INewTag, ITag } from '../../../models/blog.models';
import { blogFeature } from './blog.feature';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class BlogFacade {
  tags$ = this.store.select(blogFeature.selectTags)
  tagsById$ = this.store.select(blogFeature.selectTagsById)
  tagsTotal$ = this.store.select(blogFeature.selectTagsTotal)
  tagsLoading$ = this.store.select(blogFeature.selectLoading)
  tagsError$ = this.store.select(blogFeature.selectErrors)

  constructor(private store: Store<ITagsState>) {}

  fetchTagsList() {
    this.store.dispatch(BlogActions.tags_list_request())
  }

  crateNewTag(newTag: INewTag) {
    this.store.dispatch(BlogActions.create_tag_request(newTag))
  }

  updateNewTag(proposedTag: ITag) {
    this.store.dispatch(BlogActions.update_tag_request(proposedTag))
  }

  addTagToBlogPost(tagId: number, blogPostId: number) {
    this.store.dispatch(BlogActions.add_tag_to_blogpost_request(
      tagId, blogPostId
    ))
  }

}
