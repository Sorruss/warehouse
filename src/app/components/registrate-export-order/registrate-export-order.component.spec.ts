import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrateExportOrderComponent } from './registrate-export-order.component';

describe('RegistrateExportOrderComponent', () => {
  let component: RegistrateExportOrderComponent;
  let fixture: ComponentFixture<RegistrateExportOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrateExportOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrateExportOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
