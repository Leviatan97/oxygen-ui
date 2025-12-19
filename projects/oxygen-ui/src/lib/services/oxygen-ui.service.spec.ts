import { TestBed } from '@angular/core/testing';

import { OxygenUiService } from './oxygen-ui.service';

describe('OxygenUiService', () => {
  let service: OxygenUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OxygenUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
