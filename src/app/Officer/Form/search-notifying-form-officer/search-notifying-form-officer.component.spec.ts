import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNotifyingFormOfficerComponent } from './search-notifying-form-officer.component';

describe('SearchNotifyingFormOfficerComponent', () => {
  let component: SearchNotifyingFormOfficerComponent;
  let fixture: ComponentFixture<SearchNotifyingFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchNotifyingFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchNotifyingFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
