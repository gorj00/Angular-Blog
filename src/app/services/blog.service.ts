import { IBlogPost } from 'src/app/models/blog.models';
import { HttpService } from './http.service'; // service injected imported
import { Injectable, Inject } from '@angular/core'; // Injectable() imported
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITag, INewTag } from '../models/blog.models';

@Injectable()
export class BlogService {
  paths = {
    tag: 'tag',
    blog: 'blog',
  };

  constructor(private http: HttpService) {}

  reqUrl(appendUrl?: string) {
    // Base is injected
    let url: string = '';
    if (appendUrl) url += appendUrl;
    return url;
  }

  getTagsList(): Observable<ITag[]> {
    return this.http.Get(this.reqUrl(this.paths.tag));
  }

  createTag(newTag: INewTag): Observable<ITag> {
    return this.http.Post(this.reqUrl(`${this.paths.tag}/`), newTag);
  }

  updateTag(proposedTag: ITag): Observable<ITag> {
    return this.http.Put(this.reqUrl(`${this.paths.tag}/${proposedTag.id}`), proposedTag);
  }

  addTagToBlogPost(tagId: number, blogPostId: number): Observable<IBlogPost> {
    return this.http.Put(this.reqUrl(`${this.paths.blog}/${blogPostId}/add_tag/${tagId}/`));
  }
}
