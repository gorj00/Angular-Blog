import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarListItemComponent } from '../components/sidebar-list-item/sidebar-list-item.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    SidebarListItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [SidebarListItemComponent, MaterialModule],
  providers: [],
  bootstrap: []
})
export class SharedModule { }
