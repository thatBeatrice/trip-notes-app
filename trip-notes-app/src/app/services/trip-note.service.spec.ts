import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TripNoteService } from './trip-note.service';
import { Note, NoteDto } from '../models/note';

describe('TripNoteService', () => {
  let service: TripNoteService;
  let httpMock: HttpTestingController;

  const mockNotes: Note[] = [
    {
      id: '1',
      place: 'mock#1',
      dateFrom: new Date(2020, 0, 1),
      dateTo: new Date(2021, 0, 1),
      description: 'a',
      rating: 1,
    },
    {
      id: '2',
      place: 'mock#2',
      dateFrom: new Date(2020, 0, 2),
      dateTo: new Date(2020, 0, 2),
      description: 'b',
      rating: 2,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TripNoteService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TripNoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getNotes', () => {
    it('should return an array of notes', () => {
      service.getNotes().subscribe((notes) => {
        expect(notes).toEqual(mockNotes);
      });

      const req = httpMock.expectOne(service.baseUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockNotes);
    });
  });

  describe('#addNote', () => {
    it('should add a new note and return it', () => {
      const newNoteDto: NoteDto = {
        place: 'mock#3',
        dateFrom: new Date(2022, 0, 1),
        dateTo: new Date(2022, 0, 2),
        description: 'c',
        rating: 3,
      };

      const addedNote: Note = {
        id: '3',
        ...newNoteDto,
      };

      service.addNote(newNoteDto).subscribe((note) => {
        expect(note).toEqual(addedNote);
      });

      const req = httpMock.expectOne(service.baseUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newNoteDto);
      req.flush(addedNote);
    });
  });

  describe('#editNote', () => {
    it('should edit an existing note and return the updated note', () => {
      const updatedNote: Note = {
        id: '1',
        place: 'Updated Place',
        dateFrom: new Date(2022, 0, 1),
        dateTo: new Date(2022, 0, 2),
        description: 'Updated description',
        rating: 4,
      };

      service.editNote('1', updatedNote).subscribe((note) => {
        expect(note).toEqual(updatedNote);
      });

      const req = httpMock.expectOne(`${service.baseUrl}/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedNote);
      req.flush(updatedNote);
    });
  });

  describe('#deleteNote', () => {
    it('should delete a note and return a confirmation message', () => {
      const noteId = '1';

      service.deleteNote(noteId).subscribe((response) => {
        expect(response).toBe('Note deleted');
      });

      const req = httpMock.expectOne(`${service.baseUrl}/${noteId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush('Note deleted');
    });
  });
});
