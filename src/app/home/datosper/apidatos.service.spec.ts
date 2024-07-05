import { TestBed } from '@angular/core/testing';

import { ApidatosService } from './apidatos.service';

describe('ApidatosService', () => {
  let service: ApidatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApidatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
