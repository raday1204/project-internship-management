import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCompanyStudentComponent } from './search-company-student.component';

describe('SearchCompanyStudentComponent', () => {
  let component: SearchCompanyStudentComponent;
  let fixture: ComponentFixture<SearchCompanyStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCompanyStudentComponent]
    });
    fixture = TestBed.createComponent(SearchCompanyStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
