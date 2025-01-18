import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NotesFacade } from './state/notes-facade.service';
import { Note } from './models/note';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const favoriteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const notesFacade = inject(NotesFacade);

  var trips!: Note[];
  notesFacade.getAllNotes();
  notesFacade.favoriteTrips$
    .pipe(takeUntilDestroyed())
    .subscribe((notes) => (trips = notes));

  if (trips && trips.length >= 3) {
    return true;
  } else {
    window.confirm('There are not enough notes!');
    router.navigate(['/']);
    return false;
  }
};
