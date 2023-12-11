import { TestBed } from '@angular/core/testing';

import { SingletonDocumentService } from './singleton-document.service';

describe('SingletonDocumentService', () => {
  let service: SingletonDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingletonDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
