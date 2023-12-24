import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInformationPopupComponent } from './status-information-popup.component';

describe('StatusInformationPopupComponent', () => {
  let component: StatusInformationPopupComponent;
  let fixture: ComponentFixture<StatusInformationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusInformationPopupComponent]
    });
    fixture = TestBed.createComponent(StatusInformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
