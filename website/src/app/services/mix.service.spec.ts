import { TestBed } from '@angular/core/testing';

import { MixService } from './mix.service';

describe('MixService', () => {
  let service: MixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
