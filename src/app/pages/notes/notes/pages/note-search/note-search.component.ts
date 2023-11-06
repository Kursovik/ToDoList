import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-note-search',
  template: `<input
    #searchInput
    (input)="search.emit(searchInput.value)"
    pInputText
    placeholder="Поиск..."
  />`,
  styles: [
    `
      input {
        width: 100%;
        background-color: rgba(170, 230, 238, 0.39);
        font-size: 17px;
        border: none;
        box-sizing: border-box;
      }

      input:hover {
        background-color: rgba(80, 137, 143, 0.35);
      }
    `,
  ],
})
export class NoteSearchComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
}
