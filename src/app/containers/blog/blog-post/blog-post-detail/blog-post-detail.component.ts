import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BlogDataService } from '../../blog-dara.service';

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.less']
})
export class BlogPostDetailComponent implements OnInit {
  @Output() onGoBackAction = new EventEmitter<void>()

  constructor(
    protected blogDataService: BlogDataService,
  ) { }

  data$ = this.blogDataService.data$

  onGoBack() {
    this.onGoBackAction.emit()
  }

  ngOnInit(): void {
  }

}
