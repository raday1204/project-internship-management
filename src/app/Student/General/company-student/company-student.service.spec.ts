import { TestBed } from '@angular/core/testing';

import { CompanyStudentService } from './company-student.service';

describe('CompanyStudentService', () => {
  let service: CompanyStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
