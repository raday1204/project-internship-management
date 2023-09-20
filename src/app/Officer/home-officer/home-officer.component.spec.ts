import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfficerComponent } from './home-officer.component';

describe('HomeOfficerComponent', () => {
  let component: HomeOfficerComponent;
  let fixture: ComponentFixture<HomeOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeOfficerComponent]
    });
    fixture = TestBed.createComponent(HomeOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
