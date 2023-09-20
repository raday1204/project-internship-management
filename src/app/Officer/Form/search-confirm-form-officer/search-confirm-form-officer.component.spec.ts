import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConfirmFormOfficerComponent } from './search-confirm-form-officer.component';

describe('SearchConfirmFormOfficerComponent', () => {
  let component: SearchConfirmFormOfficerComponent;
  let fixture: ComponentFixture<SearchConfirmFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchConfirmFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchConfirmFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
