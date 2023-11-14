import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { RouterModule } from '@angular/router';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import { NoteComponent } from './notes/pages/note/note.component';
import {NotesStateService} from "./notes/services/notes-state.service";
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { NotesFormComponent } from './notes/pages/notes-form/notes-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NotesDialogComponent } from './notes/pages/notes-dialog/notes-dialog.component';
import { NoteSearchComponent } from './notes/pages/note-search/note-search.component';
import {CarouselModule} from "../../shared/components/carousel/carousel.module";
import { NoteDetailsComponent } from './notes/pages/note-details/note-details.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {SliceTextModule} from "../../shared/pipes/slice-text/slice-text.module";


@NgModule({
  declarations: [NotesComponent, NoteComponent, NotesFormComponent, NotesDialogComponent, NoteSearchComponent, NoteDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotesComponent,
      },
      {
        path: ':id',
        component: NoteDetailsComponent,
      }
    ]),
    ButtonModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    CarouselModule,
    InputTextareaModule,
    SliceTextModule,
  ],
  providers:[NotesStateService, DialogService]
})
export class NotesModule {}
