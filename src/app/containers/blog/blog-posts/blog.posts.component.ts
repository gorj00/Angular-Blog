import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { BlogCollectionService } from 'src/app/ngrx/data/blog/blog.collection-service';
import { TagsFacade } from 'src/app/ngrx/store/tags/tags.facade';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostsComponent implements OnInit {

  constructor(
    private http: HttpService,
    private bs: BlogCollectionService,
    private tagsFacade: TagsFacade,
  ) {
   }

  ngOnInit(): void {
    // this.tagsFacade.fetchTagsList()
    // this.bs.getBlogPosts()
    // this.bs.addTagToBlogPost(10, 6)
  }

}
