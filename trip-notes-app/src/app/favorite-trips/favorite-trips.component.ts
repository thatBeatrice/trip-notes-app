import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NotesFacade } from '../state/notes-facade.service';
import { TripNoteComponent } from '../trip-note/trip-note.component';
import { Note } from '../models/note';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favorite-trips',
  standalone: true,
  imports: [RouterModule, MatButtonModule, TripNoteComponent],
  templateUrl: './favorite-trips.component.html',
  styleUrl: './favorite-trips.component.scss',
})
export class FavoriteTripsComponent {
  tripNotes!: Note[];
  constructor(private notesFacade: NotesFacade, private locatiuon: Location) {
    this.notesFacade.favoriteTrips$
      .pipe(takeUntilDestroyed())
      .subscribe((notes) => (this.tripNotes = notes));
  }

  back() {
    this.locatiuon.back();
  }
}
