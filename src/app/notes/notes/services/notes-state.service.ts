import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../../types/note';

@Injectable()
export class NotesStateService {
  private _notes = new BehaviorSubject<Note[]>([]);

  public setNotesState(notes: Note[]): void {
    this._notes.next(notes);
  }
  public getNotesStateObservable() {
    return this._notes.asObservable();
  }
  public getState(){
    return this._notes.getValue();
  }
}
