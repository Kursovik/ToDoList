import { Component, Input } from '@angular/core';
import { Note } from '../../../types/note';
import { Router } from '@angular/router';
import { BaseHandlerService } from '../../../../../shared/services/base-handler.service';
import { LoaderService } from '../../../../../shared/services/loader.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { GlobalMessageService } from '../../../../../shared/services/global-message.service';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-note',
  template: `
    <div
      id="note-card"
      class=" card flex flex-column justify-content-between h-10rem p-3 "
      #cardNote
    >
      <div
        id="card-header"
        class="flex relative justify-content-between align-items-center"
      >
        <h2 class="mr-6">{{ note.title | sliceText: 20 }}</h2>
        <p-speedDial [model]="menuItems" direction="down"></p-speedDial>
      </div>
      <div id="card-content">
        <p>{{ note.text | sliceText: 70 }}</p>
      </div>
      <div id="card-footer">
        <p>
          Создано: <span>{{ note.createdOn | date: 'dd.MM.yy' }} </span>
        </p>
      </div>
    </div>
  `,
  styleUrls:['note.component.scss']
})
export class NoteComponent {
  @Input()
  note: Note;

  public menuItems: MenuItem[] = this.setMenuItems();

  constructor(
    private readonly router: Router,
    private readonly baseHandlerService: BaseHandlerService<Note>,
    public loader: LoaderService,
    private confirmationService: ConfirmationService,
    private readonly messageService: GlobalMessageService,
  ) {}
  public navigateNoteDetails(note: Note) {
    this.router.navigate([`/notes/${note.id}`]);
  }

  public deleteNote(id: number): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить заметку?',
      header: 'Удаление заметки',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        this.loader
          .isLoading(this.baseHandlerService.delete(id))
          .pipe(
            tap(() =>
              this.messageService.addMessage(
                'success',
                'Успешно',
                'Заметка удалена!',
              ),
            ),
            catchError((err) => {
              this.messageService.addMessage('error', 'Ошибка удаления', err);
              return EMPTY;
            }),
          )
          .subscribe();
      },
    });
  }
  private setMenuItems(): MenuItem[] {
    return [
      {
        icon: 'pi pi-pencil',
        command: () => this.navigateNoteDetails(this.note),
      },
      {
        icon: 'pi pi-trash',
        command: () => this.deleteNote(this.note.id),
      },
    ];
  }
}
