import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ITag, ITagsById } from 'src/app/models/blog.models';
import * as _ from 'lodash'
@Component({
  selector: 'app-blog-post-edit-tags',
  templateUrl: './blog-post-edit-tags.component.html',
  styleUrls: ['./blog-post-edit-tags.component.less'],
})
export class BlogPostEditTagsComponent implements OnInit {
  @Output() onAddTagAction = new EventEmitter<number>();
  @Output() onRemoveTagAction = new EventEmitter<number>();
  @Output() onCreateNewTagAndAddAction = new EventEmitter<string>();

  @Input() tags!: number[];
  @Input() allTags!: ITagsById;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<ITag[]>;

  @ViewChild('tagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filter(tag) : Object.values(this.allTags).slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add new tag
    if (value) {
      // this.tags.push(value);
      console.log('new val', value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tagId: number): void {
    // const index = this.tags.indexOf(tag);

    // if (index >= 0) {
    //   this.tags.splice(index, 1);
    // }
    console.log('remove ', tagId);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.tags.push(event.option.viewValue);
    // this.tagInput.nativeElement.value = '';
    // this.tagCtrl.setValue(null);
    console.log('selected ', event.option);
  }

  private _filter(value: string): ITag[] {
    const filterValue = value.toLowerCase();

    return Object.values(this.allTags).filter((tag) =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {}
}
