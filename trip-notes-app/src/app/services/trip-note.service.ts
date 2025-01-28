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
  notes: Note[] = [];

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
}
