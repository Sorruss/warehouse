import { TestBed } from '@angular/core/testing';

import { ExportRegistrationService } from './export-registration.service';

describe('ExportRegistrationService', () => {
  let service: ExportRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
