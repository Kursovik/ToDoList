import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { NoteComponent } from './notes/pages/note/note.component';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { NotesFormComponent } from './notes/pages/notes-form/notes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesDialogComponent } from './notes/pages/notes-dialog/notes-dialog.component';
import { NoteDetailsComponent } from './notes/pages/note-details/note-details.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SliceTextModule } from '../../shared/pipes/slice-text/slice-text.module';
import { API_URL } from '../../shared/injection-tokens/api.token';
import { BehaviorSubject } from 'rxjs';
import { StateSliceService } from '../../shared/services/state-slice.service';
import { BaseHandlerService } from '../../shared/services/base-handler.service';
import { InputSearchModule } from '../../shared/components/input-search/input-search.module';
import { BaseApiService } from '../../shared/services/base-api.service';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import { SpeedDialModule } from 'primeng/speeddial';



const NotesProviders: Provider[] = [
  {
    provide: API_URL,
    useValue: new BehaviorSubject('notes'),
  },
  StateSliceService,
  BaseApiService,
  BaseHandlerService,
]
@NgModule({
  declarations: [
    NotesComponent,
    NoteComponent,
    NotesFormComponent,
    NotesDialogComponent,
    NoteDetailsComponent,
  ],
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
      },
    ]),
    ButtonModule,
    InputTextModule,
    CardModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    InputSearchModule,
    SliceTextModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    SpeedDialModule,
  ],
  providers: [
    DialogService,
    NotesProviders,
    ConfirmationService,
  ],
})
export class NotesModule {}
