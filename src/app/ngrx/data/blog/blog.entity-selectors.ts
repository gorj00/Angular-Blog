import { selectRouteParams } from '../../router/router.selectors';
import { EntitySelectorsFactory } from "@ngrx/data";
import { createSelector } from "@ngrx/store";
import { IBlogPost } from 'src/app/models/blog.models';

export const blogEntitySelectors = new EntitySelectorsFactory().create<IBlogPost>('BlogPost');

export const selectedSelectedBlogPost = createSelector(
  blogEntitySelectors.selectEntityMap,
  selectRouteParams,
  (blogPosts, routeParams) =>
    routeParams?.['blogPostId'] && blogPosts?.[routeParams['blogPostId']]
      ? blogPosts[routeParams['blogPostId']]
      : null
);
