import { Component, Input } from '@angular/core';
import { Note } from '../../../types/note';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  template: `<p-card
    class="note-card cursor-pointer"
    [header]="note.title"
    (click)="editNote(note)"
  >
    <div class="flex flex-column">
      <span class="col">{{ note.text | sliceText : 40 }}</span>
      <span class="font-italic col"
        >Дата создания: {{ note.createdOn | date: 'dd.MM.yy' }}</span
      >
    </div>
    <ng-template pTemplate="footer">
      <div class="w-full flex justify-content-end">
        <button pButton icon="pi pi-trash"></button>
      </div>
    </ng-template>
  </p-card>`,
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input()
  note: Note;

  constructor(private router: Router) {}
  public editNote(note: Note) {
    this.router.navigate([`/notes/${note.id}`]);
  }
}
