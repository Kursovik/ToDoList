import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Note } from '../../../types/note';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { GlobalMessageService } from '../../../../../shared/services/global-message.service';

@Component({
  selector: 'app-notes-dialog',
  template: `<div class="p-2">
    <app-notes-form
      [loading]="!!(loader.loading | async)"
      [configData]="note"
      (submitted)="submit($event)"
    ></app-notes-form>
  </div>`,
  providers: [LoaderService],
})
export class NotesDialogComponent {
  public note = this.configData.data;
  constructor(
    private configData: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private readonly baseHandlerService: BaseHandlerService<Note>,
    public loader: LoaderService,
    private readonly messageService: GlobalMessageService,
  ) {}
  public submit(note: Note): void {
    if (note)
      this.createNote(note)
        .pipe(
          tap(() => {
            this.messageService.addMessage(
              'success',
              'Успешно!',
              'Запись создана',
            );
            this.ref.close(note);
          }),
          catchError((err) => {
            this.messageService.addMessage('error', 'Ошибка создания', err);
            return EMPTY;
          }),
        )
        .subscribe();
  }
  private createNote(note: Note): Observable<unknown> {
    return this.loader.isLoading(this.baseHandlerService.create(note));
  }
}
