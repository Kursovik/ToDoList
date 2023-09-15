import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-note-search',
  template: `<input #searchInput class="w-full" (input)="search.emit(searchInput.value)" pInputText placeholder="Поиск..." />`,
})
export class NoteSearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
}
