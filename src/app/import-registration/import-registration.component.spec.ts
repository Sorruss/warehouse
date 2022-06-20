import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportRegistrationComponent } from './import-registration.component';

describe('ImportRegistrationComponent', () => {
  let component: ImportRegistrationComponent;
  let fixture: ComponentFixture<ImportRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
