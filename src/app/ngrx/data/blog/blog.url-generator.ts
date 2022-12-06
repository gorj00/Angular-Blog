import { Injectable } from "@angular/core";
import {
  DefaultHttpUrlGenerator, Pluralizer, DefaultPluralizer, HttpResourceUrls, normalizeRoot
} from "@ngrx/data";
import { blogRootUrls } from "./blog.entity-metadata";

@Injectable()
// Based on: https://stackoverflow.com/a/62247961/19275722
export class BlogHttpUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(private aPluralizer: Pluralizer = new DefaultPluralizer([])) {
    super(aPluralizer);
  }

  protected override getResourceUrls(
    entityName: keyof typeof blogRootUrls,
    root: string
  ): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      // rootUrls contains
      // mapping of individual ngrx data entities
      // to the root URLs of their respective data sources.
      // It contains only entities which do not have
      // the default root URL.
      if (blogRootUrls.hasOwnProperty(entityName)) {
        root = blogRootUrls[entityName];
      }
      const nRoot = normalizeRoot(root);
      let urlEntityName: string = entityName
      switch (entityName) {
        case 'BlogPost':
          urlEntityName = 'blog'
          break;
        default:
          break;
      }
      // Never pluralize
      const url = `${nRoot}/${/* this.aPluralizer.pluralize(
        entityName
      ) */urlEntityName}/`.toLowerCase();

      // remove after testing
      console.log('-- entityName: ' + entityName + ', URL: ' + url);

      resourceUrls = {
        entityResourceUrl: url,
        collectionResourceUrl: url,
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}
