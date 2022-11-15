import { TestBed } from '@angular/core/testing';

import { ServizioPortaService } from './servizio-porta.service';

describe('SercizioPortaService', () => {
  let service: ServizioPortaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioPortaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
