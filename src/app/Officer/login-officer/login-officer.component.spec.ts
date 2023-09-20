import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOfficerComponent } from './login-officer.component';

describe('LoginOfficerComponent', () => {
  let component: LoginOfficerComponent;
  let fixture: ComponentFixture<LoginOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginOfficerComponent]
    });
    fixture = TestBed.createComponent(LoginOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
