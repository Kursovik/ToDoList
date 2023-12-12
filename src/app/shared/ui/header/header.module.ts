import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarMenuModule } from '../sidebar-menu/sidebar-menu.module';
import { AuthorizationButtonsComponent } from './header/authorization-buttons/authorization-buttons.component';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [HeaderComponent, AuthorizationButtonsComponent],
  exports: [HeaderComponent],
    imports: [CommonModule, NgOptimizedImage, SidebarMenuModule, ButtonModule],
})
export class HeaderModule {}
