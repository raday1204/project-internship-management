import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInformationComponent } from './status-information.component';

describe('StatusInformationComponent', () => {
  let component: StatusInformationComponent;
  let fixture: ComponentFixture<StatusInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusInformationComponent]
    });
    fixture = TestBed.createComponent(StatusInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
