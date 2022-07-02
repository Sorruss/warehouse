import { TestBed } from '@angular/core/testing';

import { RegistrateModelService } from './registrate-model.service';

describe('RegistrateModelService', () => {
  let service: RegistrateModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrateModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
