import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarMenuModule } from '../sidebar-menu/sidebar-menu.module';

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, NgOptimizedImage, SidebarMenuModule],
})
export class HeaderModule {}
