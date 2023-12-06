import { Component, OnInit } from '@angular/core';
import { Note } from '../../../types/note';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';

@Component({
  selector: 'app-note-details',
  template: `
    <div
      style="border: 1px solid #d3cec6"
      class="flex flex-column align-items-center mt-3 w-6 my-0 mx-auto p-3 border-round-bottom-lg"
    >
      <h2>Заметка от {{ note?.createdOn | date: 'dd.MM.yy' }}</h2>
      <div class="w-full">
        <app-notes-form
          [configData]="note"
          (submitted)="submitForm($event)"
        ></app-notes-form>
      </div>
    </div>`,
})
export class NoteDetailsComponent implements OnInit {
  public note: Note;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly baseHandlerService: BaseHandlerService<Note>,
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
    note && this.baseHandlerService.edit(note).subscribe();
    this.router.navigate(['notes']);
  }
}
