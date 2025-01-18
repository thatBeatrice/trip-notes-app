import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Note, NoteDto } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class TripNoteService {
  baseUrl = 'http://localhost:5174/Trip';
  constructor(private http: HttpClient) {}

  // behaviorSubject = new BehaviorSubject<Note[]>([]);

  notes: Note[] = []; //!!!!!

  //filteredNotes!: Note[];

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  addNote(note: NoteDto): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, note);
  }

  editNote(id: string, note: Note): Observable<Note> {
    return this.http.put<Note>(this.baseUrl + '/' + id, note);
  }

  deleteNote(id: string): Observable<string> {
    return this.http.delete<string>(this.baseUrl + '/' + id);
  }

  // public getNotes() {
  //   this.filteredNotes = this.notes;
  //   this.behaviorSubject.next(this.filteredNotes);
  // }

  // public addNote(note: Note) {
  //   this.notes.push(note);

  //   this.filteredNotes = this.notes;
  //   this.behaviorSubject.next(this.filteredNotes);
  // }

  // public editNote(note: Note) {
  //   this.notes[this.notes.findIndex((item) => item.id === note.id)] = note;

  //   this.filteredNotes = this.notes;
  //   this.behaviorSubject.next(this.filteredNotes);
  // }

  // public deleteNote(id: number) {
  //   this.notes = this.notes.filter((note) => note.id !== id);
  //   this.filteredNotes = this.notes;
  //   this.behaviorSubject.next(this.filteredNotes);
  // }

  // public filterNotes(
  //   searchValue: string,
  //   rating: number,
  //   startDate: Date,
  //   endDate: Date
  // ) {
  //   if (rating !== 0) {
  //     this.filteredNotes = this.notes.filter((note) => note.rating === rating);
  //   } else {
  //     this.filteredNotes = this.notes;
  //   }

  //   if (searchValue !== '') {
  //     this.filteredNotes = this.filteredNotes.filter(
  //       (note) =>
  //         note.place.toLowerCase().includes(searchValue.toLowerCase()) ||
  //         note.description.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //   }

  //   if (startDate != null) {
  //     this.filteredNotes = this.filteredNotes.filter((note) => {
  //       if (endDate !== null && startDate.getTime() <= endDate.getTime())
  //         if (
  //           note.dateFrom.getTime() >= startDate.getTime() &&
  //           note.dateFrom.getTime() <= endDate.getTime()
  //         ) {
  //           return true;
  //         } else {
  //           return false;
  //         }

  //       return note.dateFrom.getTime() >= startDate.getTime();
  //     });
  //   }

  //   this.behaviorSubject.next(this.filteredNotes);
  // }

  // public sortNotes(mode: string) {
  //   switch (mode) {
  //     case 'ascending':
  //       this.filteredNotes = this.filteredNotes.sort(
  //         (a, b) => a.dateFrom.getTime() - b.dateFrom.getTime()
  //       );
  //       break;
  //     case 'descending':
  //       this.filteredNotes = this.filteredNotes.sort(
  //         (a, b) => b.dateFrom.getTime() - a.dateFrom.getTime()
  //       );
  //       break;
  //     case 'alphabetically':
  //       this.filteredNotes = this.filteredNotes.sort((a, b) =>
  //         a.place.localeCompare(b.place)
  //       );
  //       break;
  //   }
  //   this.behaviorSubject.next(this.filteredNotes);
  // }
}
