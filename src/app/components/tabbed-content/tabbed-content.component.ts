import { Component, ContentChild, TemplateRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITab } from 'src/app/models/shared.models';

@Component({
  selector: 'app-tabbed-content',
  templateUrl: './tabbed-content.component.html',
  styleUrls: ['./tabbed-content.component.less']
})
export class TabbedContentComponent implements OnInit {
  @Output() onChangeTabId = new EventEmitter<number>()
  @Input() tabs: ITab[] = []

  constructor() { }

  changeTabId(tabId: number) {
    this.onChangeTabId.emit(tabId)
  }

  ngOnInit(): void {
  }

}
