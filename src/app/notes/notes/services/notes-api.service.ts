import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Note } from '../../types/note';

@Injectable()
export class NotesApiService {
  public getAll() {
    return of([
      {
        title: 'Note1',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 1,
      },
      {
        title: 'Not2',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 2,
      },
      {
        title: 'Note3',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 3,
      },
      {
        title: 'Note4',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 4,
      },
      {
        title: 'Note5',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 5,
      },
      {
        title: 'Note6',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 6,
      },
      {
        title: 'Note7',
        createdOn: new Date(),
        text: 'lorem ipsum dolor sit amet, consectetur',
        id: 7,
      },
    ]);
  }
  public create(note: Note) {
    return of(note);
  }
  public edit(note: Note) {
    return of(note);
  }
  public delete(id: string) {
    return of(id);
  }
}
