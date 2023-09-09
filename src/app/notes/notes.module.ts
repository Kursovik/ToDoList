import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { RouterModule } from '@angular/router';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import { NoteComponent } from './notes/pages/note/note.component';
import {NotesApiService} from "./notes/services/notes-api.service";
import {NotesStateService} from "./notes/services/notes-state.service";
import {NotesLogicService} from "./notes/services/notes-logic.service";
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { NotesFormComponent } from './notes/pages/notes-form/notes-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NotesDialogComponent } from './notes/pages/notes-dialog/notes-dialog.component';



@NgModule({
  declarations: [NotesComponent, NoteComponent, NotesFormComponent, NotesDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotesComponent,
      },
    ]),
    ButtonModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    ReactiveFormsModule,

  ],
  providers:[NotesApiService,NotesStateService,NotesLogicService, DialogService]
})
export class NotesModule {}
