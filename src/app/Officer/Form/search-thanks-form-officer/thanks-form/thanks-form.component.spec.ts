import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksFormComponent } from './thanks-form.component';

describe('ThanksFormComponent', () => {
  let component: ThanksFormComponent;
  let fixture: ComponentFixture<ThanksFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThanksFormComponent]
    });
    fixture = TestBed.createComponent(ThanksFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
