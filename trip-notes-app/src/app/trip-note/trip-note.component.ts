import { DatePipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from '../custom-snack-bar/custom-snack-bar.component';
import { ToastType } from '../enums';
import { ModalComponent } from '../modal/modal.component';
import { TitleCaseCustomPipe } from '../pipes/title-case-custom.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-trip-note',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TitleCaseCustomPipe,
    DatePipe,
  ],
  templateUrl: './trip-note.component.html',
  styleUrl: './trip-note.component.scss',
})
export class TripNoteComponent {
  id = input<string>();
  place = input.required<string>();
  description = input<string>();
  dateFrom = input<Date>();
  dateTo = input<Date>();
  rating = input<number>();
  photoId: number = Math.floor(Math.random() * 5);

  delete = output<string>();

  addHeartAboveRating = computed(() => {
    return this.rating()! >= 4;
  });

  private readonly destroyRef = inject(DestroyRef);

  readonly dialog = inject(MatDialog);

  private snackBar = inject(MatSnackBar);
  openDialog(editMode: boolean) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        editMode: editMode,
        id: this.id(),
        place: this.place(),
        description: this.description(),
        dateFrom: this.dateFrom(),
        dateTo: this.dateTo(),
        rating: this.rating(),
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        if (result == 'save') {
          this.snackBar.openFromComponent(CustomSnackBarComponent, {
            data: {
              message: 'Note has been edited.',
              action: 'OK',
              type: ToastType.EDIT,
            },
            duration: 5500,
          });
        }
      });
  }

  deleteNote() {
    this.delete.emit(this.id()!);
  }
}
