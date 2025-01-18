import { createReducer, on } from '@ngrx/store';
import { NotesActions } from './notes.actions';
import { initialState } from '../models/notes.state';

export const notesReducer = createReducer(
  initialState,
  on(NotesActions.getNotes, (state) => ({
    ...state,
  })),
  on(NotesActions.getNotesSuccess, (state, { notes }) => ({
    ...state,
    notes,
    loadedSuccessfully: true,
    areNotes: notes && notes.length > 0 ? true : false,
  })),
  on(NotesActions.getNotesFailure, (state, { error }) => ({
    ...state,
    error,
    loadedSuccessfully: false,
  })),
  on(NotesActions.addNote, (state, { note }) => ({
    ...state,
    notes: [...state.notes, { ...note, id: '' }], //copie notitele din starea curenta si pune si notita recenta la sfarsit
    loading: true,
  })),
  on(NotesActions.addNoteSuccess, (state, { note }) => ({
    ...state,
    notes: [...state.notes, { ...note }], //copie notitele din starea curenta si pune si notita recenta la sfarsit
    loading: false,
  })),
  on(NotesActions.addNoteFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(NotesActions.deleteNote, (state, { noteId }) => ({
    ...state,
    notes: state.notes.filter((n) => n.id !== noteId),
    loading: true,
  })),
  on(NotesActions.deleteNoteSuccess, (state, { noteId }) => ({
    ...state,
    notes: state.notes.filter((n) => n.id !== noteId),
    loading: false,
  })),
  on(NotesActions.deleteNoteFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(NotesActions.updateNote, (state, { noteId, note }) => ({
    ...state,
    notes: state.notes.map((n) => (n.id === noteId ? note : n)),
    loading: true,
  })),
  on(NotesActions.updateNoteSuccess, (state, { note }) => ({
    ...state,
    notes: state.notes.map((n) => (n.id === note.id ? note : n)),
    loading: false,
  })),
  on(NotesActions.updateNoteFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(NotesActions.setFilterCriteria, (state, { filterCriteria }) => ({
    ...state,
    filterCriteria: filterCriteria,
  })),
  on(NotesActions.setSortCriteria, (state, { sortCriteria }) => ({
    ...state,
    sortCriteria: sortCriteria,
  })),
);
