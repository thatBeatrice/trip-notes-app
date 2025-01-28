import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTripsComponent } from './favorite-trips.component';
import { NotesFacade } from '../state/notes-facade.service';
import { Note, NoteDto } from '../models/note';
import { of } from 'rxjs';
import { FilterCriteria } from '../models/criteria';
import { SortType } from '../enums';

class NotesFacadeMock {
  areNotes$ = of(true);
  loadedSuccessfully$ = of(true);
  filteredNotes$ = of([]);
  filterCriteria$ = of({} as FilterCriteria);
  sortCriteria$ = of(SortType.ASCENDING);
  favoriteTrips$ = of([]);

  getAllNotes() {}
  addNote(noteDto: NoteDto) {}
  updateNote(noteId: string, note: Note) {}
  deleteNote(noteId: string) {}
  updateFilterCriteria(filterCriteria: FilterCriteria) {}
  updateSortCriteria(sortCriteria: SortType) {}
}

describe('FavoriteTripsComponent', () => {
  let component: FavoriteTripsComponent;
  let fixture: ComponentFixture<FavoriteTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteTripsComponent],
      providers: [{ provide: NotesFacade, useClass: NotesFacadeMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
