// import { TestBed } from '@angular/core/testing';

// import { Note } from '../note';
// import { TripNoteService } from './trip-note.service';

// describe('TripNoteService', () => {
//   let service: TripNoteService;
//   let mockNotes: Note[];

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(TripNoteService);
//     mockNotes = [
//       {
//         id: 1,
//         place: 'mock#1',
//         dateFrom: new Date(2020, 0, 1),
//         dateTo: new Date(2021, 0, 1),
//         description: 'a',
//         rating: 1,
//       },
//       {
//         id: 2,
//         place: 'mock#2',
//         dateFrom: new Date(2020, 0, 2),
//         dateTo: new Date(2020, 0, 2),
//         description: 'b',
//         rating: 2,
//       },
//     ];
//     service.notes = mockNotes;
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('#getNotes should update #filteredNotes and #behaviorSubject', () => {
//     service.getNotes();

//     expect(service.filteredNotes).toEqual(mockNotes);
//     expect(service.behaviorSubject.getValue()).toEqual(mockNotes);
//   });

//   it('#addNote should add the new note to the list', () => {
//     const mockNewNote: Note = {
//       id: 7,
//       place: 'mock#7',
//       dateFrom: new Date(2027, 7, 2),
//       dateTo: new Date(2027, 7, 2),
//       description: '7',
//       rating: 5,
//     };
//     const result = [
//       {
//         id: 1,
//         place: 'mock#1',
//         dateFrom: new Date(2020, 0, 1),
//         dateTo: new Date(2021, 0, 1),
//         description: 'a',
//         rating: 1,
//       },
//       {
//         id: 2,
//         place: 'mock#2',
//         dateFrom: new Date(2020, 0, 2),
//         dateTo: new Date(2020, 0, 2),
//         description: 'b',
//         rating: 2,
//       },
//       {
//         id: 7,
//         place: 'mock#7',
//         dateFrom: new Date(2027, 7, 2),
//         dateTo: new Date(2027, 7, 2),
//         description: '7',
//         rating: 5,
//       },
//     ];

//     service.addNote(mockNewNote);

//     expect(service.notes).toEqual(result);
//   });

//   it('#deleteNote should delete the note from the list', () => {
//     const result: Note[] = [
//       {
//         id: 2,
//         place: 'mock#2',
//         dateFrom: new Date(2020, 0, 2),
//         dateTo: new Date(2020, 0, 2),
//         description: 'b',
//         rating: 2,
//       },
//     ];

//     service.deleteNote(1);

//     expect(service.notes).toEqual(result);
//   });

//   describe('filterNotes', () => {
//     it('should return all notes when no filter is applied', () => {
//       service.filterNotes('', 0, null!, null!);

//       expect(service.filteredNotes).toEqual(mockNotes);
//       expect(service.behaviorSubject.getValue()).toEqual(mockNotes);
//     });

//     it('should return an empty array when the rating is not found', () => {
//       service.filterNotes('', 3.5, null!, null!);

//       expect(service.filteredNotes).toEqual([]);
//       expect(service.behaviorSubject.getValue()).toEqual([]);
//     });

//     it('should return the note with a valid rating filter', () => {
//       const result: Note[] = [
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//       ];

//       service.filterNotes('', 2, null!, null!);

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('should return an empty array when searchValue is not found', () => {
//       service.filterNotes('abc', 0, null!, null!);

//       expect(service.filteredNotes).toEqual([]);
//       expect(service.behaviorSubject.getValue()).toEqual([]);
//     });

//     it('should return the note with a valid searchValue filter', () => {
//       const result: Note[] = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//       ];

//       service.filterNotes('#1', 0, null!, null!);

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('should return the note when searchValue matches description', () => {
//       const result: Note[] = [
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//       ];

//       service.filterNotes('b', 0, null!, null!);

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('should return all notes after startDate when startDate is specified', () => {
//       service.notes = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];
//       const result: Note[] = [
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];

//       service.filterNotes('', 0, new Date(2020, 9, 7), null!);

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('should return an empty array when startDate is bigger than all', () => {
//       service.notes = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];

//       service.filterNotes('', 0, new Date(2022, 9, 7), null!);

//       expect(service.filteredNotes).toEqual([]);
//       expect(service.behaviorSubject.getValue()).toEqual([]);
//     });

//     it('should filter by startDate when endDate is smaller than startDate', () => {
//       service.notes = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];

//       const result: Note[] = [
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];

//       service.filterNotes('', 0, new Date(2020, 8, 7), new Date(2019, 9, 7));

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('should return an empty array when the date is out of bounds', () => {
//       service.notes = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];

//       service.filterNotes('', 0, new Date(2020, 8, 2), new Date(2020, 8, 5));

//       expect(service.filteredNotes).toEqual([]);
//       expect(service.behaviorSubject.getValue()).toEqual([]);
//     });

//     it('should return an array of notes when dates are valid', () => {
//       service.notes = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//         {
//           id: 4,
//           place: 'mock#4',
//           dateFrom: new Date(2020, 9, 10),
//           dateTo: new Date(2021, 9, 2),
//           description: 'b',
//           rating: 2.5,
//         },
//       ];

//       const result: Note[] = [
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 3,
//           place: 'mock#3',
//           dateFrom: new Date(2020, 9, 1),
//           dateTo: new Date(2021, 9, 1),
//           description: 'a',
//           rating: 1.5,
//         },
//       ];

//       service.filterNotes('', 0, new Date(2020, 0, 2), new Date(2020, 9, 5));

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });
//   });

//   describe('sortNotes', () => {
//     it('should sort ascending by date', () => {
//       const result: Note[] = [
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//       ];
      
//       service.getNotes();
//       service.sortNotes('ascending');

//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('descending sort', () => {
//       const result: Note[] = [
//         {
//           id: 2,
//           place: 'mock#2',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 1,
//           place: 'mock#1',
//           dateFrom: new Date(2020, 0, 1),
//           dateTo: new Date(2021, 0, 1),
//           description: 'a',
//           rating: 1,
//         },
//       ];

//       service.getNotes();
//       service.sortNotes('descending');
      
//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });

//     it('alphabetical sort', () => {
//       service.notes = [
//         {
//           id: 0,
//           place: 'aaaa',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 2,
//           place: 'cccc',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 1,
//           place: 'abbb',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//       ];

//       const result: Note[] = [
//         {
//           id: 0,
//           place: 'aaaa',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 1,
//           place: 'abbb',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//         {
//           id: 2,
//           place: 'cccc',
//           dateFrom: new Date(2020, 0, 2),
//           dateTo: new Date(2020, 0, 2),
//           description: 'b',
//           rating: 2,
//         },
//       ];
//       service.getNotes();
//       service.sortNotes('alphabetically');
//       expect(service.filteredNotes).toEqual(result);
//       expect(service.behaviorSubject.getValue()).toEqual(result);
//     });
//   });
// });
