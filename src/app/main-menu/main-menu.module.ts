import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import {RouterModule} from "@angular/router";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainMenuComponent,
      }
    ]),
    CardModule
  ]
})
export class MainMenuModule { }
