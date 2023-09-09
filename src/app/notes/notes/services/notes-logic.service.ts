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
        console.log(data);
        this.notesStateService.setNotesState(data);
      }),
    );
  }
  public createNotes(note: Note) {
    return  this.notesApiService.create(note).pipe(
      tap((note) => {
        this.notesStateService.getState().push(note)
      }),
    );
  }
  public editNotes(data: Note) {
    return  this.notesApiService.edit(data).pipe(
      tap((notes) => {
        this.notesStateService.setNotesState(this.notesStateService.getState().map(note=>({
          ...note,
          ...data,
        })))
      }),
    );
  }
}
