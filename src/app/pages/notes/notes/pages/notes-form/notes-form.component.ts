import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../../types/note';

@Component({
  selector: 'app-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss'],
})
export class NotesFormComponent implements OnInit {
  @Input() public configData: Note;
  @Output()
  public submitted = new EventEmitter();

  public noteForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {}
  ngOnInit(): void {
    this.initForm();
    this.patchForm(this.configData);

  }
  private initForm(): void {
    this.noteForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null],
    });
  }

  private patchForm(data: Note) {
    this.noteForm.patchValue(data);
  }

  public submitForm() {
    this.submitted.emit({
      ...this.noteForm.value,
      createdOn: new Date(),
      id: this.configData && this.configData?.id
    });
  }

  public cancelSubmitForm() {
    this.submitted.emit(null);
  }
}
