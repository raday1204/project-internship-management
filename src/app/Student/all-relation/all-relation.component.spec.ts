import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRelationComponent } from './all-relation.component';

describe('AllRelationComponent', () => {
  let component: AllRelationComponent;
  let fixture: ComponentFixture<AllRelationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRelationComponent]
    });
    fixture = TestBed.createComponent(AllRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
