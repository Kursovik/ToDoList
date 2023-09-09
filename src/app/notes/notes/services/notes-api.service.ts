import { Injectable } from '@angular/core';
import {of} from "rxjs";
import {Note} from "../../types/note";

@Injectable()
export class NotesApiService {
  public getAll(){
    return of([{
      title: 'Note',
      createdOn: new Date(),
      text: 'lorem ipsum dolor sit amet, consectetur',
      id: 1,
    }])
  }
  public create(note: Note  ){
    return of(note)
  }
  public edit(note: Note){
    return of(note)
  }
  public delete(id: string){
    return of(id)
  }
}
