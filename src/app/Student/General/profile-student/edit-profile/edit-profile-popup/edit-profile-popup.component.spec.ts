import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePopupComponent } from './edit-profile-popup.component';

describe('EditProfilePopupComponent', () => {
  let component: EditProfilePopupComponent;
  let fixture: ComponentFixture<EditProfilePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfilePopupComponent]
    });
    fixture = TestBed.createComponent(EditProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
