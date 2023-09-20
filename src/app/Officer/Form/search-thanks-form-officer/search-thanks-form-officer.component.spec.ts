import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchThanksFormOfficerComponent } from './search-thanks-form-officer.component';

describe('SearchThanksFormOfficerComponent', () => {
  let component: SearchThanksFormOfficerComponent;
  let fixture: ComponentFixture<SearchThanksFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchThanksFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchThanksFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
