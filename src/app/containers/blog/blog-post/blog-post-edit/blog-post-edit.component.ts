import { IBlogPost, ITagsById } from 'src/app/models/blog.models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BlogDataService } from '../../blog-dara.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-blog-post-edit',
  templateUrl: './blog-post-edit.component.html',
  styleUrls: ['./blog-post-edit.component.less']
})
export class BlogPostEditComponent implements OnInit {
  @Output() onGoBackAction = new EventEmitter<void>()
  @Output() onFormSavedAction = new EventEmitter<IBlogPost>()

  @Input() allTags!: ITagsById

  private _post!: IBlogPost | null;
  @Input()
  set post(post: IBlogPost | null) {
    if (post) {
      // Set here due the vals coming from async observable
      this.postForm.setValue({
        title: post.title,
        detail: post.detail,
        text: post.text ? post.text : '',
      });
    }
    this._post = post
  }
  get post(): IBlogPost | null {
    return this._post
  }

  constructor(
    protected blogDataService: BlogDataService,
  ) {}

  // data$ = this.blogDataService.data$

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    detail: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  onSubmit(form: FormGroup) {
    if (form && this.post) {
      const editedPost: IBlogPost = {
        ...this.post,
        title: form.value['title'],
        detail: form.value['detail'],
        text: form.value['text'],
      }
      this.onFormSavedAction.emit(editedPost)
      // console.log(editedPost)
    }

  }

  onGoBack() {
    this.onGoBackAction.emit()
  }

  ngOnInit(): void {
  }

}
