import { TestBed } from '@angular/core/testing';

import { LeaveTimeService } from './leave-time.service';

describe('LeaveTimeService', () => {
  let service: LeaveTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
