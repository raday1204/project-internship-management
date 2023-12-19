import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormStudentPrintComponent } from './company-form-student-print.component';

describe('CompanyFormStudentPrintComponent', () => {
  let component: CompanyFormStudentPrintComponent;
  let fixture: ComponentFixture<CompanyFormStudentPrintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFormStudentPrintComponent]
    });
    fixture = TestBed.createComponent(CompanyFormStudentPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
