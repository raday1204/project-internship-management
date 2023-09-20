import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompanyOfficerComponent } from './search-company-officer.component';

describe('SearchCompanyOfficerComponent', () => {
  let component: SearchCompanyOfficerComponent;
  let fixture: ComponentFixture<SearchCompanyOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCompanyOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchCompanyOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
