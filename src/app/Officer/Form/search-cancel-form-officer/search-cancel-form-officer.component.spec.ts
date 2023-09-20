import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCancelFormOfficerComponent } from './search-cancel-form-officer.component';

describe('SearchCancelFormOfficerComponent', () => {
  let component: SearchCancelFormOfficerComponent;
  let fixture: ComponentFixture<SearchCancelFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCancelFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchCancelFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
