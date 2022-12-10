import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarListItemComponent } from '../components/sidebar-list-item/sidebar-list-item.component';
import { TabbedContentComponent } from '../components/tabbed-content/tabbed-content.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    SidebarListItemComponent,
    TabbedContentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [SidebarListItemComponent, TabbedContentComponent, MaterialModule],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
