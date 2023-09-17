import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {ListboxModule} from "primeng/listbox";



@NgModule({
  declarations: [
    SidebarMenuComponent
  ],
  exports: [
    SidebarMenuComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    ListboxModule
  ]
})
export class SidebarMenuModule { }
