import { TestBed } from '@angular/core/testing';

import { EnterCompanyService } from './enter-company.service';

describe('EnterCompanyService', () => {
  let service: EnterCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
