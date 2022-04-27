import { TestBed } from '@angular/core/testing';

import { PeliculaserviceService } from './peliculaservice.service';

describe('PeliculaserviceService', () => {
  let service: PeliculaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeliculaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
