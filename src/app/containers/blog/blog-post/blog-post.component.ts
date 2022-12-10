import { Component, OnInit } from '@angular/core';
import { ITab } from 'src/app/models/shared.models';
import { BlogDataService } from '../blog-dara.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.less']
})
export class BlogPostComponent implements OnInit {
  tabs: {[key: string]: ITab} ={
    tab1: { tabId: 1, tabTitle: 'Detail' },
    tab2: { tabId: 2, tabTitle: 'Edit' },
  }

  constructor(
    protected blogDataService: BlogDataService,
  ) { }
  data$ = this.blogDataService.data$


  onTabIdChanged(tabId: number) {
    console.log(tabId)
  }

  ngOnInit(): void {
  }

}
