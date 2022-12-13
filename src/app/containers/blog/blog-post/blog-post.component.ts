import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ITab } from 'src/app/models/shared.models';
import { BlogDataService } from '../blog-dara.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent implements OnInit {
  tabs: {[key: string]: ITab} ={
    tab1: { tabId: 1, tabTitle: 'Detail' },
    tab2: { tabId: 2, tabTitle: 'Edit' },
  }

  constructor(
    protected blogDataService: BlogDataService,
    private router: Router,
  ) {}
  data$ = this.blogDataService.data$


  onTabIdChanged(tabId: number) {
    console.log(tabId)
  }

  goBack() {
    this.blogDataService.onSelectBlogPost(null)
    this.router.navigate(['/blog'])
  }

  ngOnInit(): void {
  }

}
