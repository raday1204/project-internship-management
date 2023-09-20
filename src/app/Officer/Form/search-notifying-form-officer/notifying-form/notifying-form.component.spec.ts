import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyingFormComponent } from './notifying-form.component';

describe('NotifyingFormComponent', () => {
  let component: NotifyingFormComponent;
  let fixture: ComponentFixture<NotifyingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyingFormComponent]
    });
    fixture = TestBed.createComponent(NotifyingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
