import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BlogPostDataService } from 'src/app/ngrx/data/blog/blog-post.data-service';
import { HttpService } from 'src/app/services/http.service';
import { BlogCollectionService } from 'src/app/ngrx/data/blog/blog.collection-service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostsComponent implements OnInit {

  constructor(private http: HttpService, private bs: BlogCollectionService) {
   }

  ngOnInit(): void {}

}
