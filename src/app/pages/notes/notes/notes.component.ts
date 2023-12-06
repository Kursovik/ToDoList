import { Component, OnInit } from '@angular/core';
import { NotesDialogService } from './services/notes-dialog.service';
import { Note } from '../types/note';
import { BaseHandlerService } from '../../../shared/services/base-handler.service';
import { StateSliceService } from '../../../shared/services/state-slice.service';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  providers: [NotesDialogService, LoaderService],
})
export class NotesComponent implements OnInit {
  public notes$ = this.stateSliceService.state;
  constructor(
    private dialogService: NotesDialogService,
    private stateSliceService: StateSliceService<Note>,
    private readonly baseHandlerService: BaseHandlerService<Note>,
    public readonly loader: LoaderService,
  ) {}
  public ngOnInit(): void {
    this.getNotes();
  }
  private getNotes() {
    this.loader.isLoading(this.baseHandlerService.initState()).subscribe();
  }
  public openNotesDialog(): void {
    this.dialogService.openDialog().onClose.subscribe();
  }
}
