import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { favoriteGuard } from './favorite.guard';

describe('favoriteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => favoriteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
