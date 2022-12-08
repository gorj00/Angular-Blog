import { EntityMetadataMap } from '@ngrx/data';
import { BlogPost, Tag } from 'src/app/models/blog.models';

export const blogEntityMetadata: EntityMetadataMap = {
  BlogPost, Tag
};

export const blogRootUrls = {
  BlogPost: 'https://endevel-task.doc.endevel.cz/',
  Tag:      'https://endevel-task.doc.endevel.cz/',
 }
