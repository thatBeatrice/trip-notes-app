import { createSelector } from '@ngrx/store';
import { AppState, NotesState } from '../models/notes.state';
import { SortType } from '../enums';
import { create } from 'domain';

export const selectFeature = (state: AppState) => state.notes;

export const selectNotes = createSelector(
  selectFeature,
  (state: NotesState) => state.notes
);

export const selectLoading = createSelector(
  selectFeature,
  (state: NotesState) => state.loading
);

export const selectError = createSelector(
  selectFeature,
  (state: NotesState) => state.error
);

export const selectAreNotes = createSelector(
  selectFeature,
  (state: NotesState) => state.areNotes
);

export const selectLoadedSuccessfully = createSelector(
  selectFeature,
  (state: NotesState) => state.loadedSuccessfully
);

// filter selectors

export const selectFilterCriteria = createSelector(
  selectFeature,
  (state: NotesState) => state.filterCriteria
);

export const selectSortCriteria = createSelector(
  selectFeature,
  (state: NotesState) => state.sortCriteria
);

export const selectFilteredNotes = createSelector(
  selectNotes,
  selectFilterCriteria,
  selectSortCriteria,
  (notes, filterCriteria, sortCriteria) => {
    return notes
      .filter((note) => {
        const matchesRating =
          filterCriteria.rating !== undefined && filterCriteria.rating !== 0
            ? note.rating === filterCriteria.rating
            : true;

        var matchesDate!: boolean;
        if (
          filterCriteria.startDate !== undefined &&
          filterCriteria.startDate !== null
        ) {
          const noteDateFrom = new Date(note.dateFrom);
          const startDate = new Date(filterCriteria.startDate);
          const endDate = new Date(filterCriteria.endDate!);

          if (!isNaN(endDate.getTime())) {
            if (
              noteDateFrom.getTime() >= startDate.getTime() &&
              noteDateFrom.getTime() <= endDate.getTime()
            )
              matchesDate = true;
            else {
              matchesDate = false;
            }
          } else {
            matchesDate = noteDateFrom.getTime() >= startDate.getTime();
          }
        } else {
          matchesDate = true;
        }

        const matchesSearchValue =
          filterCriteria.searchValue !== '' &&
          filterCriteria.searchValue !== undefined
            ? note.place
                .toLowerCase()
                .includes(filterCriteria.searchValue.toLowerCase()) ||
              note.description
                .toLowerCase()
                .includes(filterCriteria.searchValue.toLowerCase())
            : true;

        return matchesRating && matchesDate && matchesSearchValue;
      })
      .sort((a, b) => {
        var aDateFrom = new Date(a.dateFrom);
        var bDateFrom = new Date(b.dateFrom);
        switch (sortCriteria) {
          case SortType.ASCENDING:
            return aDateFrom.getTime() - bDateFrom.getTime();
          case SortType.DESCENDING:
            return bDateFrom.getTime() - aDateFrom.getTime();
          case SortType.ALPHABETICALLY:
            return a.place.localeCompare(b.place);
            default:
              return 0;
        }
      });
  }
);

export const selectFavoriteTrips = createSelector(
  selectNotes,
  (notes) => notes.filter((note) => note.rating >= 4)
);
