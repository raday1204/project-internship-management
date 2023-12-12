import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFormStudentPopupComponent } from './company-form-student-popup.component';

describe('CompanyFormStudentPopupComponent', () => {
  let component: CompanyFormStudentPopupComponent;
  let fixture: ComponentFixture<CompanyFormStudentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyFormStudentPopupComponent]
    });
    fixture = TestBed.createComponent(CompanyFormStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
