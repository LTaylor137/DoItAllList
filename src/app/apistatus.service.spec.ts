import { TestBed } from '@angular/core/testing';

import { ApistatusService } from './Services/apistatus.service';

describe('ApistatusService', () => {
  let service: ApistatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApistatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
