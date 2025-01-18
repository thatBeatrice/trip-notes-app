import { CommonModule } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CustomSnackBarComponent } from '../custom-snack-bar/custom-snack-bar.component';
import { dateValidator } from '../custom-validators';
import { SortType, ToastType } from '../enums';
import { FamousTripComponent } from '../famous-trip/famous-trip.component';
import { ModalComponent } from '../modal/modal.component';
import { Note } from '../models/note';
import { NotesFacade } from '../state/notes-facade.service';
import { TripNoteComponent } from '../trip-note/trip-note.component';

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    TripNoteComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSliderModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
    FamousTripComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  tripNotes!: Note[];
  showFiller = false;
  ratingValue: number = 0;
  searchValue = new FormControl<string>('');
  dates = new FormGroup({
    startDate: new FormControl(null),
    endDate: new FormControl(null),
  });
  notesAdded = signal<number>(0);
  isData: boolean = false;
  bestNote!: Note;
  worstNote!: Note;

  constructor(private notesFacade: NotesFacade) {
    this.dates.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(({ startDate, endDate }) => {
        this.filterNotes();
        if (endDate) {
          this.dates.setValidators([dateValidator('startDate', 'endDate')!]);
          this.dates.updateValueAndValidity({ emitEvent: false });
        } else {
          this.dates.clearValidators();
          this.dates.updateValueAndValidity({ emitEvent: false });
        }
      });

    this.searchValue.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.filterNotes();
    });

    effect(() => {
      if (this.notesAdded() > 0) {
        this.openSnackBar(ToastType.ADD, 'Note has been added.', 'OK');
      }
    });

    this.notesFacade.getAllNotes();

    this.notesFacade.filteredNotes$
      .pipe(takeUntilDestroyed())
      .subscribe((notes) => {
        this.tripNotes = notes;
        this.bestNote = this.tripNotes.sort((a, b) => a.rating - b.rating)[
          this.tripNotes.length - 1
        ];
        this.worstNote = this.tripNotes.sort((a, b) => a.rating - b.rating)[0];
      });

    combineLatest({
      areNotes: this.notesFacade.areNotes$,
      loadedSuccessfully: this.notesFacade.loadedSuccessfully$,
    })
      .pipe(takeUntilDestroyed())
      .subscribe(
        ({ areNotes, loadedSuccessfully }) =>
          (this.isData = !areNotes || !loadedSuccessfully ? false : true)
      );
  }

  deleteNote(id: string) {
    this.notesFacade.deleteNote(id);
  }

  onNoteDelete(id: string) {
    this.deleteNote(id);
    this.openSnackBar(ToastType.DELETE, 'Note has been deleted.', 'OK');
  }

  readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  openDialog(editMode: boolean) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        editMode: editMode,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        if (result === 'add') {
          this.notesAdded.update((value) => value + 1);
        }
      });
  }

  private snackBar = inject(MatSnackBar);

  openSnackBar(type: ToastType, message: string, action?: string) {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      data: { message: message, action: action, type: type },
      duration: 5500,
    });
  }

  resetFilters() {
    this.dates.setValue({
      startDate: null,
      endDate: null,
    });
    this.ratingValue = 0;
    this.notesFacade.updateFilterCriteria({
      searchValue: undefined,
      rating: undefined,
      startDate: undefined,
      endDate: undefined,
    });
  }

  filterNotes() {
    if (
      this.dates.controls['startDate'].value! !== null &&
      this.dates.controls['endDate'].value! !== null
    ) {
      var startDate = new Date(this.dates.controls['startDate'].value!);
      var endDate = new Date(this.dates.controls['endDate'].value!);
      if (startDate.getTime() <= endDate.getTime())
        this.notesFacade.updateFilterCriteria({
          searchValue: this.searchValue.value!,
          rating: this.ratingValue,
          startDate: startDate,
          endDate: endDate,
        });
    } else {
      this.notesFacade.updateFilterCriteria({
        searchValue: this.searchValue.value!,
        rating: this.ratingValue,
        startDate: this.dates.controls['startDate'].value!,
        endDate: undefined,
      });
    }
  }

  sortType = SortType;
  sortNotes(type: SortType) {
    this.notesFacade.updateSortCriteria(type);
  }
}
