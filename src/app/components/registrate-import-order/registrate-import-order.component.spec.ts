import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrateImportOrderComponent } from './registrate-import-order.component';

describe('RegistrateImportOrderComponent', () => {
  let component: RegistrateImportOrderComponent;
  let fixture: ComponentFixture<RegistrateImportOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrateImportOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrateImportOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
