import { TestBed } from '@angular/core/testing';

import { FFlowAnimatorService } from './f-flow-animator.service';

describe('FFlowAnimatorService', () => {
  let service: FFlowAnimatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FFlowAnimatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
