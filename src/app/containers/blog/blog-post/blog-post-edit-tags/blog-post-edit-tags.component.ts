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
  @Output() onCreateNewTag = new EventEmitter<string>();

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
      // Created new tag and adds it to the current blogpost,
      // more info in blog-data.service.ts
      this.onCreateNewTag.emit(value)
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
    this.onRemoveTagAction.emit(tagId)
    console.log('remove ', tagId);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.tags.push(event.option.viewValue);
    // this.tagInput.nativeElement.value = '';
    // this.tagCtrl.setValue(null);
    const value = event.option.value
    const containsAlready = this.tags.includes(value)
    !containsAlready && this.onAddTagAction.emit(event.option.value)
    console.log('selected ', event.option.value);
  }

  private _filter(value: string): ITag[] {
    // Ensure handling string, as the function is called when a tagId (number) is selected as well,
    // ingore such cases and return []
    if (typeof value === 'string') {
      console.log('filter ', value)
      const filterValue = value.toLowerCase();
      const allTagsArr = Object.values(this.allTags)

      return allTagsArr.filter((tag) => {
        const alreadyContains = this.tags.find(savedTagId => savedTagId === tag.id)
        return tag.name.toLowerCase().includes(filterValue) && !alreadyContains
      });
    }
    return [];
  }

  ngOnInit(): void {}
}
