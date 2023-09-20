import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorStudentComponent } from './coordinator-student.component';

describe('CoordinatorStudentComponent', () => {
  let component: CoordinatorStudentComponent;
  let fixture: ComponentFixture<CoordinatorStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoordinatorStudentComponent]
    });
    fixture = TestBed.createComponent(CoordinatorStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
