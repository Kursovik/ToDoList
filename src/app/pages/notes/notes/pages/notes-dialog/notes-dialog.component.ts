import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Note } from '../../../types/note';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes-dialog',
  template: `<div class="card p-2">
    <app-notes-form
      [configData]="note"
      (submitted)="submit($event)"
    ></app-notes-form>
  </div>`,
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
