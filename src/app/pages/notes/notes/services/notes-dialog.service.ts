import { Injectable } from '@angular/core';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { Note } from '../../types/note';
import {NotesDialogComponent} from "../pages/notes-dialog/notes-dialog.component";

@Injectable()
export class NotesDialogService {
  constructor(private dialogService: DialogService) {}
  public openDialog(data?: Note): DynamicDialogRef {
    return this.dialogService.open(NotesDialogComponent, {
      header: `${data ? 'Редактировать' : 'Добавить'} заметку`,
      width: '50%',
      data: data,
    });
  }
}
