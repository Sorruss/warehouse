import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportRegistrationComponent } from './export-registration.component';

describe('ExportRegistrationComponent', () => {
  let component: ExportRegistrationComponent;
  let fixture: ComponentFixture<ExportRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportRegistrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
