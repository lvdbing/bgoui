import { TestBed } from '@angular/core/testing';

import { NzHelperService } from './nz-helper.service';

describe('NzHelperService', () => {
  let service: NzHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NzHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
