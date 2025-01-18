import { TestBed } from '@angular/core/testing';

import { NotesFacadeService } from './notes-facade.service';

describe('NotesFacadeService', () => {
  let service: NotesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
