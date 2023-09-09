import {Component, OnInit} from '@angular/core';
import {NotesLogicService} from "./services/notes-logic.service";
import {NotesStateService} from "./services/notes-state.service";
import {NotesDialogService} from "./services/notes-dialog.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers:[NotesDialogService],
})
export class NotesComponent implements  OnInit {
  public notes$ = this.notesStateService.getNotesStateObservable();
  constructor(private notesLogicService: NotesLogicService, private notesStateService: NotesStateService,private dialogService: NotesDialogService) {
  }
  public ngOnInit(): void {
    this.getNotes();
  }
  private getNotes(){
    this.notesLogicService.getNotes().subscribe();
  }
  public openNotesDialog(): void {
    this.dialogService.openDialog().onClose.subscribe();
  }

}
