import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAssessmentStatusComponent } from './confirm-assessment-status.component';

describe('ConfirmAssessmentStatusComponent', () => {
  let component: ConfirmAssessmentStatusComponent;
  let fixture: ComponentFixture<ConfirmAssessmentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmAssessmentStatusComponent]
    });
    fixture = TestBed.createComponent(ConfirmAssessmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
