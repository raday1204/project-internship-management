import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyPopupComponent } from './edit-company-popup.component';

describe('EditCompanyPopupComponent', () => {
  let component: EditCompanyPopupComponent;
  let fixture: ComponentFixture<EditCompanyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompanyPopupComponent]
    });
    fixture = TestBed.createComponent(EditCompanyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
