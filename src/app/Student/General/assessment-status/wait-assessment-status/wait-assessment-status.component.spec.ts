import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitAssessmentStatusComponent } from './wait-assessment-status.component';

describe('WaitAssessmentStatusComponent', () => {
  let component: WaitAssessmentStatusComponent;
  let fixture: ComponentFixture<WaitAssessmentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitAssessmentStatusComponent]
    });
    fixture = TestBed.createComponent(WaitAssessmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
