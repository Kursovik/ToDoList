import { Injectable } from '@angular/core';
import { NotesApiService } from './notes-api.service';
import { NotesStateService } from './notes-state.service';
import { tap } from 'rxjs';
import { Note } from '../../types/note';

@Injectable()
export class NotesLogicService {
  constructor(
    private notesApiService: NotesApiService,
    private notesStateService: NotesStateService,
  ) {}
  public getNotes() {
    return this.notesApiService.getAll().pipe(
      tap((data) => {
        this.notesStateService.setNotesState(data);
      }),
    );
  }
  public createNotes(note: Note) {
    return this.notesApiService.create(note).pipe(
      tap((note) => {
        this.notesStateService.getState().push({
          ...note,
          id: this.notesStateService.getState().length + 1,
        });
      }),
    );
  }
  public editNotes(data: Note) {
    return this.notesApiService.edit(data).pipe(
      tap(() => {
        this.notesStateService.setNotesState(
          this.notesStateService.getState().map((note) => {
            return note.id === data.id ? { ...data } : { ...note };
          }),
        );
      }),
    );
  }
}
