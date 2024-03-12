import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ListboxModule } from 'primeng/listbox';
import {AvatarModule} from "primeng/avatar";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@NgModule({
  declarations: [SidebarMenuComponent],
  exports: [SidebarMenuComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    ListboxModule,
    AvatarModule,
    ConfirmPopupModule,
  ],
})
export class SidebarMenuModule {}
