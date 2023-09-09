import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotesLogicService } from '../../services/notes-logic.service';
import { Note } from '../../../types/note';
import { every } from 'rxjs';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss'],
})
export class NotesDialogComponent {
  public config = this.configData.data;
  constructor(
    private configData: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private notesLogicService: NotesLogicService,
  ) {}
  public submit(note: Note): void {
    if (note) this.checkConfig(note).subscribe();

    this.ref.close(note);
  }
  private checkConfig(note: Note) {
    return this.config
      ? this.notesLogicService.editNotes(note)
      : this.notesLogicService.createNotes(note);
  }
}
