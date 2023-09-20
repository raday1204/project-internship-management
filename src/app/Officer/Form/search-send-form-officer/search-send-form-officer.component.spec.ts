import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSendFormOfficerComponent } from './search-send-form-officer.component';

describe('SearchSendFormOfficerComponent', () => {
  let component: SearchSendFormOfficerComponent;
  let fixture: ComponentFixture<SearchSendFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchSendFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchSendFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
