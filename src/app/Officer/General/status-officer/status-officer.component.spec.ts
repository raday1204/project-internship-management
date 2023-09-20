import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOfficerComponent } from './status-officer.component';

describe('StatusOfficerComponent', () => {
  let component: StatusOfficerComponent;
  let fixture: ComponentFixture<StatusOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusOfficerComponent]
    });
    fixture = TestBed.createComponent(StatusOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
