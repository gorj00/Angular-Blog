import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BlogDataService } from '../blog-dara.service';
import { Router } from '@angular/router';
import { EBlogModes } from 'src/app/models/blog.models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostsComponent implements OnInit {

  constructor(
    protected blogDataService: BlogDataService,
    private router: Router,
  ) {
  }

  data$ = this.blogDataService.data$
  // To have access in the template
  EBlogModes = EBlogModes

  onSelectBlogPost(id: number, mode: EBlogModes = EBlogModes.READ) {
    this.blogDataService.onSelectBlogPost(mode)
    this.router.navigate(['/blog', id])
  }

  onSelectPage(e: PageEvent) {
    this.blogDataService.onChangePage(e.pageIndex + 1)
  }

  ngOnInit(): void {
  }

}
