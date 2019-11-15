/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MapaService } from './Mapa.service';

describe('Service: Mapa', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapaService]
    });
  });

  it('should ...', inject([MapaService], (service: MapaService) => {
    expect(service).toBeTruthy();
  }));
});
