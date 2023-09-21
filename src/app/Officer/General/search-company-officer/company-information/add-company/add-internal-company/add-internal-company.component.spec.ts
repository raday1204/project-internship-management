import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInternalCompanyComponent } from './add-internal-company.component';

describe('AddInternalCompanyComponent', () => {
  let component: AddInternalCompanyComponent;
  let fixture: ComponentFixture<AddInternalCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddInternalCompanyComponent]
    });
    fixture = TestBed.createComponent(AddInternalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
