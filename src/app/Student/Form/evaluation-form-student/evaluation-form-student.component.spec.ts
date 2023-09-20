import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationFormStudentComponent } from './evaluation-form-student.component';

describe('EvaluationFormStudentComponent', () => {
  let component: EvaluationFormStudentComponent;
  let fixture: ComponentFixture<EvaluationFormStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationFormStudentComponent]
    });
    fixture = TestBed.createComponent(EvaluationFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
