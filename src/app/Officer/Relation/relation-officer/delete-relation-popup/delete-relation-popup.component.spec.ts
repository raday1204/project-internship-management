import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRelationPopupComponent } from './delete-relation-popup.component';

describe('DeleteRelationPopupComponent', () => {
  let component: DeleteRelationPopupComponent;
  let fixture: ComponentFixture<DeleteRelationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRelationPopupComponent]
    });
    fixture = TestBed.createComponent(DeleteRelationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
