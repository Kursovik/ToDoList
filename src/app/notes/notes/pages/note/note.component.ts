import { Component, Input } from '@angular/core';
import { Note } from '../../../types/note';
import { NotesDialogService } from '../../services/notes-dialog.service';

@Component({
  selector: 'app-note',
  template: `<p-card class="note-card" [header]="note.title">
    <div class="flex flex-column">
    <span class="col">{{ note.text }}</span>
    <span class="font-italic col">Дата создания: {{note.createdOn | date : 'dd.MM.yy' }}</span>
    </div>
    <ng-template pTemplate="footer">
      <div class="w-full flex justify-content-end">
        <button pButton (click)="editNote(note)" class="mr-3">
          Редактировать
        </button>
        <button pButton>Удалить</button>
      </div>
    </ng-template>
  </p-card>`,
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input()
  note: Note;

  constructor(private dialogService: NotesDialogService) {}
  public editNote(note: Note) {
    this.dialogService.openDialog(note);
  }
}
