import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormStudentComponent } from './company-form-student.component';

describe('CompanyFormStudentComponent', () => {
  let component: CompanyFormStudentComponent;
  let fixture: ComponentFixture<CompanyFormStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFormStudentComponent]
    });
    fixture = TestBed.createComponent(CompanyFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
