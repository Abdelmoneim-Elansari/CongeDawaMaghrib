import { TestBed } from '@angular/core/testing';

import { GestionDeCongesService } from './gestion-de-conges.service';

describe('GestionDeCongesService', () => {
  let service: GestionDeCongesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionDeCongesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
