import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarMenuModule } from '../sidebar-menu/sidebar-menu.module';
import { AuthorizationButtonsComponent } from './header/authorization-buttons/authorization-buttons.component';
import {ButtonModule} from "primeng/button";
import {ConfirmPopupModule} from "primeng/confirmpopup";

@NgModule({
  declarations: [HeaderComponent, AuthorizationButtonsComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, NgOptimizedImage, SidebarMenuModule, ButtonModule, ConfirmPopupModule],

})
export class HeaderModule {}
