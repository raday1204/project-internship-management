import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationOfficerComponent } from './relation-officer.component';

describe('RelationOfficerComponent', () => {
  let component: RelationOfficerComponent;
  let fixture: ComponentFixture<RelationOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationOfficerComponent]
    });
    fixture = TestBed.createComponent(RelationOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
