import { Component, Input } from '@angular/core';
import { Note } from '../../../types/note';
import {NotesDialogService} from "../../services/notes-dialog.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input()
  note: Note;

  constructor(private dialogService: NotesDialogService) {
  }
  public editNote(note: Note) {
    this.dialogService.openDialog(note);
  }
}
