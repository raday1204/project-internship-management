import { TestBed } from '@angular/core/testing';

import { LoginStudentService } from './login-student.service';

describe('LoginStudentService', () => {
  let service: LoginStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
