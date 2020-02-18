import { TestBed } from '@angular/core/testing';

import { DiamondsService } from './diamonds.service';

describe('DiamondsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiamondsService = TestBed.get(DiamondsService);
    expect(service).toBeTruthy();
  });
});
