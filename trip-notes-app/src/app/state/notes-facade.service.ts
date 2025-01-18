import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortType } from '../enums';
import { FilterCriteria } from '../models/criteria';
import { Note, NoteDto } from '../models/note';
import { AppState } from '../models/notes.state';
import { NotesActions } from './notes.actions';
import {
  selectAreNotes,
  selectFavoriteTrips,
  selectFilterCriteria,
  selectFilteredNotes,
  selectLoadedSuccessfully,
  selectNotes,
  selectSortCriteria,
} from './notes.selectors';

@Injectable({
  providedIn: 'root',
})
export class NotesFacade {
  store = inject(Store<AppState>);

  areNotes$ = this.store.select(selectAreNotes);
  loadedSuccessfully$ = this.store.select(selectLoadedSuccessfully);
  filteredNotes$ = this.store.select(selectFilteredNotes);
  filterCriteria$ = this.store.select(selectFilterCriteria);
  sortCriteria$ = this.store.select(selectSortCriteria);
  favoriteTrips$ = this.store.select(selectFavoriteTrips);

  constructor() {}

  getAllNotes() {
    this.store.dispatch(NotesActions.getNotes());
  }

  addNote(noteDto: NoteDto) {
    this.store.dispatch(
      NotesActions.addNote({
        note: {
          place: noteDto.place,
          dateFrom: noteDto.dateFrom,
          dateTo: noteDto.dateTo,
          description: noteDto.description,
          rating: noteDto.rating,
        },
      })
    );
  }

  updateNote(noteId: string, note: Note) {
    this.store.dispatch(
      NotesActions.updateNote({ noteId: noteId, note: note })
    );
  }

  deleteNote(noteId: string) {
    this.store.dispatch(NotesActions.deleteNote({ noteId: noteId }));
  }

  updateFilterCriteria(filterCriteria: FilterCriteria) {
    this.store.dispatch(NotesActions.setFilterCriteria({ filterCriteria }));
  }

  updateSortCriteria(sortCriteria: SortType) {
    this.store.dispatch(NotesActions.setSortCriteria({ sortCriteria }));
  }
}
