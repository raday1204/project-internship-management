import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceFormStudentComponent } from './acceptance-form-student.component';

describe('AcceptanceFormStudentComponent', () => {
  let component: AcceptanceFormStudentComponent;
  let fixture: ComponentFixture<AcceptanceFormStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptanceFormStudentComponent]
    });
    fixture = TestBed.createComponent(AcceptanceFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
