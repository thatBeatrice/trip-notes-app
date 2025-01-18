import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { dateValidator } from '../custom-validators';
import { Note, NoteDto } from '../models/note';
import { TripNoteService } from '../services/trip-note.service';
import { NotesFacade } from '../state/notes-facade.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modal',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  editMode!: boolean;
  id!: string;
  isDisabled = true;
  details = new FormGroup(
    {
      place: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      dateFrom: new FormControl<Date>(new Date(), Validators.required),
      dateTo: new FormControl<Date>(
        new Date(new Date().getTime() + 24 * 60 * 60 * 1000), //tomorrow's date
        Validators.required
      ),
      rating: new FormControl<number>(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]),
    },
    [dateValidator('dateFrom', 'dateTo')!]
  );
  initialDetails = {};

  constructor(
    private notesFacade: NotesFacade,
    private tripNoteService: TripNoteService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.editMode = data.editMode;
    this.id = data.id ? data.id : '';
    if (this.editMode) {
      this.details.setValue({
        place: data.place,
        description: data.description,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        rating: data.rating,
      });
      this.initialDetails = this.details.value;
    }
    this.details.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (
        !this.compareDetails(this.initialDetails, this.details.value) &&
        this.initialDetails
      ) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    });
  }

  compareDetails(initialDetails: any, details: any): boolean {
    if (
      initialDetails.place === details.place &&
      initialDetails.description === details.description &&
      initialDetails.dateFrom === details.dateFrom &&
      initialDetails.dateTo === details.dateTo &&
      initialDetails.rating === details.rating
    ) {
      return true;
    }
    return false;
  }

  editNote(id: string, note: Note) {
    this.notesFacade.updateNote(id, note);
  }

  addNote(noteDto: NoteDto) {
    this.notesFacade.addNote(noteDto);
  }

  readonly dialogRef = inject(MatDialogRef<ModalComponent>);

  applyChanges() {
    if (this.editMode) {
      const note: Note = {
        id: this.id,
        place: this.details.controls['place'].value!,
        description: this.details.controls['description'].value!,
        dateFrom: this.details.controls['dateFrom'].value!,
        dateTo: this.details.controls['dateTo'].value!,
        rating: this.details.controls['rating'].value!,
      };
      this.editNote(note.id, note);
    } else {
      const noteDto: NoteDto = {
        place: this.details.controls['place'].value!,
        description: this.details.controls['description'].value!,
        dateFrom: this.details.controls['dateFrom'].value!,
        dateTo: this.details.controls['dateTo'].value!,
        rating: this.details.controls['rating'].value!,
      };
      this.addNote(noteDto);
    }
  }
}
