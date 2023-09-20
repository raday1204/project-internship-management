import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCompanyComponent } from './print-company.component';

describe('PrintCompanyComponent', () => {
  let component: PrintCompanyComponent;
  let fixture: ComponentFixture<PrintCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintCompanyComponent]
    });
    fixture = TestBed.createComponent(PrintCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
