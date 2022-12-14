import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BlogDataService } from '../blog-dara.service';

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogSidebarComponent implements OnInit {

  constructor(
    protected blogDataService: BlogDataService,
  ) {
  }

  data$ = this.blogDataService.data$

  ngOnInit(): void {}

}
