import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { BlogCollectionService } from 'src/app/ngrx/data/blog/blog.collection-service';
import { BlogFacade } from 'src/app/ngrx/store/blog/blog.facade';
import { BlogDataService } from '../blog-dara.service';
import { Router } from '@angular/router';

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
    private blogFacade: BlogFacade,
    protected blogDataService: BlogDataService,
    private router: Router,
  ) {
  }

  data$ = this.blogDataService.data$

  onSelectBlogPost(id: number) {
    this.blogDataService.onSelectBlogPost(id)
    this.router.navigate(['/blog', id])
  }

  ngOnInit(): void {
    // this.tagsFacade.fetchTagsList()
    // this.bs.getBlogPosts()
    // this.bs.addTagToBlogPost(10, 6)
  }

}
