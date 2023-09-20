import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterCompanyFormComponent } from './enter-company-form.component';

describe('EnterCompanyFormComponent', () => {
  let component: EnterCompanyFormComponent;
  let fixture: ComponentFixture<EnterCompanyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterCompanyFormComponent]
    });
    fixture = TestBed.createComponent(EnterCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
