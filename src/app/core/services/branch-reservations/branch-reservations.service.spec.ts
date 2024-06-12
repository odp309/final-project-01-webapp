import { TestBed } from '@angular/core/testing';

import { BranchReservationsService } from './branch-reservations.service';

describe('BranchReservationsService', () => {
  let service: BranchReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
