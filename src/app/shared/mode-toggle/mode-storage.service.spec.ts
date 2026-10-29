import { TestBed } from '@angular/core/testing';

import { ModeLocalStorageService } from './mode-storage.service';

describe('ModeLocalStorageService', () => {
  let service: ModeLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeLocalStorageService],
    });
    service = TestBed.inject(ModeLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
