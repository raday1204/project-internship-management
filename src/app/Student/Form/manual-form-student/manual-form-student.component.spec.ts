import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualFormStudentComponent } from './manual-form-student.component';

describe('ManualFormStudentComponent', () => {
  let component: ManualFormStudentComponent;
  let fixture: ComponentFixture<ManualFormStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManualFormStudentComponent]
    });
    fixture = TestBed.createComponent(ManualFormStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
