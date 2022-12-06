import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';


export const blogEntityMetadata: EntityMetadataMap = {
  BlogPost: {
    entityName: 'blog',
  },
  Tag: {},
};

export const blogRootUrls = {
  BlogPost: 'https://endevel-task.doc.endevel.cz/',
  Tag:      'https://endevel-task.doc.endevel.cz/',
 }
