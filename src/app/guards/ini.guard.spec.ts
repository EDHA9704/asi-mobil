import { TestBed, async, inject } from '@angular/core/testing';

import { IniGuard } from './ini.guard';

describe('IniGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IniGuard]
    });
  });

  it('should ...', inject([IniGuard], (guard: IniGuard) => {
    expect(guard).toBeTruthy();
  }));
});
