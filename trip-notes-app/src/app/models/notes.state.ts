import { SortType } from '../enums';
import { FilterCriteria } from './criteria';
import { Note } from './note';


export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string;
  loadedSuccessfully: boolean;
  areNotes: boolean;
  filterCriteria: FilterCriteria;
  sortCriteria: SortType;
}

export const initialState: NotesState = {
  notes: [],
  loading: false,
  error: '',
  loadedSuccessfully: false,
  areNotes: false,
  filterCriteria: {
    searchValue: undefined,
    rating: undefined,
    startDate: undefined,
    endDate: undefined,
  },
  sortCriteria: SortType.NONE
};

export interface AppState {
  notes: NotesState;
}