import { TestBed } from '@angular/core/testing';

import { DbgamesService } from './dbgames.service';

describe('DbgamesService', () => {
  let service: DbgamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbgamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
