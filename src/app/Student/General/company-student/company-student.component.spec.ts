import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStudentComponent } from './company-student.component';

describe('CompanyStudentComponent', () => {
  let component: CompanyStudentComponent;
  let fixture: ComponentFixture<CompanyStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyStudentComponent]
    });
    fixture = TestBed.createComponent(CompanyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
