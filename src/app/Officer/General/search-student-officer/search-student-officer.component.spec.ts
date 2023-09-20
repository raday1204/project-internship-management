import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStudentOfficerComponent } from './search-student-officer.component';

describe('SearchStudentOfficerComponent', () => {
  let component: SearchStudentOfficerComponent;
  let fixture: ComponentFixture<SearchStudentOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchStudentOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchStudentOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
