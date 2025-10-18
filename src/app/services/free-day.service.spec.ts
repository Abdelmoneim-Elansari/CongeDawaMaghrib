import { TestBed } from '@angular/core/testing';

import { FreeDayService } from './free-day.service';

describe('FreeDayService', () => {
  let service: FreeDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
