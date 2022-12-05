import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar-list-item',
  templateUrl: './sidebar-list-item.component.html',
  styleUrls: ['./sidebar-list-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarListItemComponent implements OnInit {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() isBold: boolean = false;
  @Input() emitData: any;
  @Output() onClicked = new EventEmitter<number | void>();

  constructor() { }

  onClick() {
    if (this.emitData) {
      this.onClicked.emit(this.emitData)
    } else {
      this.onClicked.emit()
    }
  }

  ngOnInit(): void {
  }

}
