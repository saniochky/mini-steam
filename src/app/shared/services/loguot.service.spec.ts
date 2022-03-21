import { TestBed } from '@angular/core/testing';

import { LoguotService } from './loguot.service';

describe('LoguotService', () => {
  let service: LoguotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoguotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
