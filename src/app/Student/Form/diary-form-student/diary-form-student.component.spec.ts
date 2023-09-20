import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryFormStudentComponent } from './diary-form-student.component';

describe('DiaryFormStudentComponent', () => {
  let component: DiaryFormStudentComponent;
  let fixture: ComponentFixture<DiaryFormStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiaryFormStudentComponent]
    });
    fixture = TestBed.createComponent(DiaryFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
