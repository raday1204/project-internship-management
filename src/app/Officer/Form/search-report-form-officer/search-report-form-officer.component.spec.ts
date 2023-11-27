import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportFormOfficerComponent } from './search-report-form-officer.component';

describe('SearchReportFormOfficerComponent', () => {
  let component: SearchReportFormOfficerComponent;
  let fixture: ComponentFixture<SearchReportFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchReportFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchReportFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
