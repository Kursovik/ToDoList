import { Component, OnInit } from '@angular/core';
import { NotesDialogService } from './services/notes-dialog.service';
import { Note } from '../types/note';
import { BaseHandlerService } from '../../../shared/services/base-handler.service';
import { CacheStateService } from '../../../shared/services/cache-state.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NotesDialogService],
})
export class NotesComponent implements OnInit {
  public notes$ = this.cacheStateService.state;
  private notesCopy: Note[];
  constructor(
    private dialogService: NotesDialogService,
    private readonly cacheStateService: CacheStateService<Note>,
    private readonly baseHandlerService: BaseHandlerService<Note>,
  ) {}
  public ngOnInit(): void {
    this.getNotes();
    this.notesCopy = this.cacheStateService.getStaticState();
  }
  private getNotes() {
    // this.notesLogicService.getNotes().subscribe();
    this.baseHandlerService.initState().subscribe();
  }
  public openNotesDialog(): void {
    this.dialogService.openDialog().onClose.subscribe();
  }

  public searchNotes(str: string): void {
    str
      ? this.cacheStateService.setState(
          this.notesCopy.filter((data) => {
            return data.title.toLowerCase().includes(str.toLowerCase());
          }),
        )
      : this.cacheStateService.setState(this.notesCopy);
  }
}
