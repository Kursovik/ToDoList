import { Injectable } from '@angular/core';
import { NotesStateService } from './notes-state.service';
import { filter, map, Observable, tap } from 'rxjs';
import { Note } from '../../types/note';
import { BaseApiService } from '../../../../shared/services/base-api.service';
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";

@Injectable()
export class NotesLogicService {
  constructor(
    private apiService: BaseApiService<Note>,
    private notesStateService: NotesStateService,
  ) {}
  public getNotes() {
    if (this.notesStateService.getState().length) return this.notesStateService.getNotesStateObservable();
    return this.apiService.getAll().pipe(
      tap((data) => {
        this.notesStateService.setNotesState(data);
      }),
    );
  }
  public getNotesById(id: number): Observable<Note> {
    return this.apiService.getAll().pipe(
      map((notes) => {
        return { ...notes.filter((note) => note.id === +id)[0] };
      }),
    );
  }
  public createNotes(note: Note) {
    return this.apiService.create(note).pipe(
      tap((note) => {
        this.notesStateService.getState().push({
          ...note,
          id: this.notesStateService.getState().length + 1,
        });
      }),
    );
  }
  public editNotes(data: Note) {
    return this.apiService.edit(data).pipe(
      tap(() => {
        this.notesStateService.setNotesState(
          this.notesStateService.getState().map((note) => {
            console.log(data.id)
            return note.id === data.id ? { ...data } : { ...note };
          }),
        );
      }),
    );
  }
}
