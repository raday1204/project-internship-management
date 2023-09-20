import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPermissionFormOfficerComponent } from './search-permission-form-officer.component';

describe('SearchPermissionFormOfficerComponent', () => {
  let component: SearchPermissionFormOfficerComponent;
  let fixture: ComponentFixture<SearchPermissionFormOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPermissionFormOfficerComponent]
    });
    fixture = TestBed.createComponent(SearchPermissionFormOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
