import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationPopupComponent } from './add-relation-popup.component';

describe('AddRelationPopupComponent', () => {
  let component: AddRelationPopupComponent;
  let fixture: ComponentFixture<AddRelationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRelationPopupComponent]
    });
    fixture = TestBed.createComponent(AddRelationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
