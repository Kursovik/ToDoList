import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderModule } from './shared/ui/header/header.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        CommonModule,
        RouterOutlet,
        HeaderModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
