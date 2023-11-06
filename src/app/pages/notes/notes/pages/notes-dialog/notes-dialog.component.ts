import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotesLogicService } from '../../services/notes-logic.service';
import { Note } from '../../../types/note';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss'],
})
export class NotesDialogComponent {
  public note = this.configData.data;
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
    return this.note
      ? this.notesLogicService.editNotes(note)
      : this.notesLogicService.createNotes(note);
  }
}
