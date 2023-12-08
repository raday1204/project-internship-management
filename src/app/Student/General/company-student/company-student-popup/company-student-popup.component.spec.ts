import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStudentPopupComponent } from './company-student-popup.component';

describe('CompanyStudentPopupComponent', () => {
  let component: CompanyStudentPopupComponent;
  let fixture: ComponentFixture<CompanyStudentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyStudentPopupComponent]
    });
    fixture = TestBed.createComponent(CompanyStudentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
