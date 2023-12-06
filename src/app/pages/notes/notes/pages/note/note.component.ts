import { Component, Input } from '@angular/core';
import { Note } from '../../../types/note';
import { Router } from '@angular/router';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';

@Component({
  selector: 'app-note',
  template: ` <div
    (click)="editNote(note)"
    id="note-card"
    class="card flex flex-column justify-content-between h-10rem cursor-pointer p-3 "
  >
    <div
      id="card-header"
      class="flex justify-content-between align-items-start"
    >
      <h2>{{ note.title | sliceText: 20 }}</h2>
      <button
        (click)="deleteNote(note.id, $event)"
        class="focus:border-none"
        pButton
        icon="pi pi-times"
      ></button>
    </div>
    <div id="card-content">
      <p>{{ note.text | sliceText: 70 }}</p>
    </div>
    <div id="card-footer">
      <p>
        Создано: <span>{{ note.createdOn | date: 'dd.MM.yy' }} </span>
      </p>
    </div>
  </div>`,
  styles: [
    `
      :host .card:hover {
        background-color: rgb(189, 172, 76);
      }
    `,
  ],
})
export class NoteComponent {
  @Input()
  note: Note;

  constructor(
    private readonly router: Router,
    private readonly baseHandlerService: BaseHandlerService<Note>,
  ) {}
  public editNote(note: Note) {
    this.router.navigate([`/notes/${note.id}`]);
  }

  public deleteNote(id: number, $event: Event): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.baseHandlerService.delete(id).subscribe();
  }
}
