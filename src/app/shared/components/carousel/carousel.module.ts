import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel/carousel.component';
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
  imports: [CommonModule, ButtonModule],
})
export class CarouselModule {}
