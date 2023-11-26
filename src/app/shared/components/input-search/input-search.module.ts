import {NgModule} from "@angular/core";
import { InputSearchComponent } from './input-search/input-search.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    InputTextModule,
    ReactiveFormsModule
  ],
  exports: [
    InputSearchComponent
  ],
  declarations: [
    InputSearchComponent
  ]
})
export class InputSearchModule {}
