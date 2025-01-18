import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SortType } from '../enums';
import { FilterCriteria } from '../models/criteria';
import { Note, NoteDto } from '../models/note';

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    'Add Note': props<{ note: NoteDto }>(),
    'Add Note Success': props<{ note: Note }>(),
    'Add Note Failure': props<{ error: string }>(),
    'Update Note': props<{ noteId: string; note: Note }>(),
    'Update Note Success': props<{ note: Note }>(),
    'Update Note Failure': props<{ error: string }>(),
    'Delete Note': props<{ noteId: string }>(),
    'Delete Note Success': props<{ noteId: string }>(),
    'Delete Note Failure': props<{ error: string }>(),
    'Get Notes': emptyProps(),
    'Get Notes Success': props<{ notes: Note[] }>(),
    'Get Notes Failure': props<{ error: string }>(),
    'Set Filter Criteria': props<{ filterCriteria: FilterCriteria }>(),
    'Set Sort Criteria': props<{ sortCriteria: SortType }>(),
  },
});
