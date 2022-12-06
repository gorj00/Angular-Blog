import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { blogEntityMetadata } from './ngrx/data/blog/blog.entity-metadata';
const entityMetadata: EntityMetadataMap = {
  ...blogEntityMetadata
};

const pluralNames = {  };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
