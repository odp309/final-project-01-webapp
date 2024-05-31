import { TestBed } from '@angular/core/testing';

import { AlluserService } from './alluser.service';

describe('AlluserService', () => {
  let service: AlluserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlluserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
