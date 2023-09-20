import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRelationComponent } from './add-relation.component';

describe('AddRelationComponent', () => {
  let component: AddRelationComponent;
  let fixture: ComponentFixture<AddRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRelationComponent]
    });
    fixture = TestBed.createComponent(AddRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
