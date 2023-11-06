import { Component, OnInit } from '@angular/core';
import { NotesLogicService } from '../../services/notes-logic.service';
import { Note } from '../../../types/note';
import { NotesStateService } from '../../services/notes-state.service';
import {ActivatedRoute, Router} from '@angular/router';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  public note: Note;
  constructor(
    private readonly notesLogicService: NotesLogicService,
    private readonly notesStateService: NotesStateService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}
  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.notesLogicService.getNotesById(id)),
        tap((note) => (this.note = note)),
      )
      .subscribe(note=>{
        console.log(note)
      });
  }

  public submitForm(note: Note) {
    this.notesLogicService.editNotes(note).subscribe();
    this.router.navigate(['notes']);
  }
}
