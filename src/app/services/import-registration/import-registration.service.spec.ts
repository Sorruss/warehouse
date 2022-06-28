import { TestBed } from '@angular/core/testing';

import { ImportRegistrationService } from './import-registration.service';

describe('ImportRegistrationService', () => {
  let service: ImportRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
