import { Component, OnInit } from '@angular/core';
import { NotesLogicService } from './services/notes-logic.service';
import { NotesStateService } from './services/notes-state.service';
import { NotesDialogService } from './services/notes-dialog.service';
import { Note } from '../types/note';
import { take } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NotesDialogService],
})
export class NotesComponent implements OnInit {
  public notes$ = this.notesStateService.getNotesStateObservable();
  private notesCopy: Note[];
  constructor(
    private notesLogicService: NotesLogicService,
    private notesStateService: NotesStateService,
    private dialogService: NotesDialogService,
  ) {}
  public ngOnInit(): void {
    this.getNotes();
    this.notesCopy = [...this.notesStateService.getState()];
  }
  private getNotes() {
    this.notesLogicService.getNotes().subscribe();
  }
  public openNotesDialog(): void {
    this.dialogService.openDialog().onClose.subscribe();
  }

  public searchNotes(str: string): void {
    str
      ? this.notesStateService.setNotesState(
          this.notesCopy.filter((data) => {
            return data.title.toLowerCase().includes(str.toLowerCase());
          }),
        )
      : this.notesStateService.setNotesState(this.notesCopy);
  }

  protected readonly length = length;
}
