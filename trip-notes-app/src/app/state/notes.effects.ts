import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  map,
  mergeMap,
  of,
  switchMap
} from 'rxjs';
import { TripNoteService } from '../services/trip-note.service';
import { NotesActions } from './notes.actions';
import { selectLoading } from './notes.selectors';
import { AppState } from '../models/notes.state';

@Injectable()
export class NotesEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.getNotes),
      switchMap(() =>
        this.store.select(selectLoading).pipe(
          filter((loading) => !loading),
          switchMap(() =>
            this.tripNoteService.getNotes().pipe(
              map((notes) => {
                return notes
                  ? NotesActions.getNotesSuccess({ notes })
                  : NotesActions.getNotesSuccess({ notes: [] });
              }),
              catchError((error) =>
                of(NotesActions.getNotesFailure({ error: error.message }))
              )
            )
          )
        )
      )
    )
  );

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNote),
      mergeMap((action) =>
        this.tripNoteService.addNote(action.note).pipe(
          map((value) => {
            if (value) {
              return NotesActions.addNoteSuccess({ note: value });
            } else
              return NotesActions.addNoteFailure({
                error: 'AddNote returned null',
              });
          }),
          catchError((error) =>
            of(NotesActions.addNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      mergeMap((action) =>
        this.tripNoteService.editNote(action.noteId, action.note).pipe(
          map((value) => {
            if (value) {
              return NotesActions.updateNoteSuccess({ note: value });
            } else
              return NotesActions.updateNoteFailure({
                error: 'UpdateNote returned null',
              });
          }),
          catchError((error) =>
            of(NotesActions.updateNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      mergeMap((action) =>
        this.tripNoteService.deleteNote(action.noteId).pipe(
          map((value) => {
            return NotesActions.deleteNoteSuccess({ noteId: value });
          }),
          catchError((error) =>
            of(NotesActions.deleteNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private tripNoteService: TripNoteService) {}
}
