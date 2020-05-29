import { TestBed } from '@angular/core/testing';

import { PersistentService } from './persistent.service';

describe('PersistentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersistentService = TestBed.get(PersistentService);
    expect(service).toBeTruthy();
  });
});
