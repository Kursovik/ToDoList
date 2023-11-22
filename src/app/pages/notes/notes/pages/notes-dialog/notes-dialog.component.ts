import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Note } from '../../../types/note';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss'],
})
export class NotesDialogComponent {
  public note = this.configData.data;
  constructor(
    private configData: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private readonly baseHandlerService: BaseHandlerService<Note>,
  ) {}
  public submit(note: Note): void {
    if (note) this.checkConfig(note).subscribe();
    this.ref.close(note);
  }
  private checkConfig(note: Note): Observable<Note> {
    return this.baseHandlerService.create(note);
  }
}
