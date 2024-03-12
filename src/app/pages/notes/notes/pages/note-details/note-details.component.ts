import { Component, OnInit } from '@angular/core';
import { Note } from '../../../types/note';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { GlobalMessageService } from '../../../../../shared/services/global-message.service';

@Component({
  selector: 'app-note-details',
  template: ` <div
    style="border: 1px solid #d3cec6"
    class="flex flex-column align-items-center mt-3 w-6 my-0 mx-auto p-3 border-round-bottom-lg"
  >
    <h2>Заметка от {{ note?.createdOn | date: 'dd.MM.yy' }}</h2>
    <div class="w-full">
      <app-notes-form
        [loading]="!!(loader.loading | async)"
        [configData]="note"
        (submitted)="submitForm($event)"
      ></app-notes-form>
    </div>
  </div>`,
  providers: [LoaderService],
})
export class NoteDetailsComponent implements OnInit {
  public note: Note;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly baseHandlerService: BaseHandlerService<Note>,
    public readonly loader: LoaderService,
    private readonly messageService: GlobalMessageService,
  ) {}
  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) =>
          this.baseHandlerService
            .initState()
            .pipe(map((notes) => notes.filter((note) => note.id === +id))),
        ),
      )
      .subscribe((data) => {
        this.note = data[0];
      });
  }

  public submitForm(note: Note) {
    if (!note) {
      this.router.navigate(['notes']);
      return;
    }
    this.loader
      .isLoading(this.baseHandlerService.edit(note))
      .pipe(
        tap(() => {
          this.messageService.addMessage(
            'success',
            'Заметка обновлена!',
            'Запрос прошел успешно',
          );
          this.router.navigate(['notes']);
        }),
      )
      .subscribe();
  }
}
