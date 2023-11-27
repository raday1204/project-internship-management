import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRelationPopupComponent } from './edit-relation-popup.component';

describe('EditRelationPopupComponent', () => {
  let component: EditRelationPopupComponent;
  let fixture: ComponentFixture<EditRelationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRelationPopupComponent]
    });
    fixture = TestBed.createComponent(EditRelationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
