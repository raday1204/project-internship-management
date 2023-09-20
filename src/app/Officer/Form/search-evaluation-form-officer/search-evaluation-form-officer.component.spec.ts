import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEvaluationFormOfficerComponent } from './search-evaluation-form-officer.component';

describe('SearchEvaluationFormOfficerComponent', () => {
  let component: SearchEvaluationFormOfficerComponent;
  let fixture: ComponentFixture<SearchEvaluationFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchEvaluationFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchEvaluationFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
