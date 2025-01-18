export interface Note {
  id: string;
  place: string;
  dateFrom: Date;
  dateTo: Date;
  description: string;
  rating: number;
}

export interface NoteDto{
  place: string;
  dateFrom: Date;
  dateTo: Date;
  description: string;
  rating: number;
}