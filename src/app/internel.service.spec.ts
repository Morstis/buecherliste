import { TestBed } from '@angular/core/testing';

import { InternelService } from './internel.service';

describe('InternelService', () => {
  let service: InternelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
