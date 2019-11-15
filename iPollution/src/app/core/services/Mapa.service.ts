/*
  Mapa.service.ts
  Implementación: Carlos Tortosa Micó
  Equipo 4
  iPollution
*/

import { Injectable, ElementRef } from '@angular/core';

declare var google;
@Injectable({
  providedIn: 'root'
})
export class MapaService {

  mapa: any;
  puntoCentral: any;

  constructor(posicion: any , settings: any, elementoHtml: ElementRef) {
    this.puntoCentral = posicion;
    this.mapa = new google.maps.Map(elementoHtml, {
      zoom: settings.zoom
    });

    this.centrarEn(this.puntoCentral);
  }


  centrarEn(posicion: any) {
    this.mapa.setCenter(posicion);
  }

  refrescarMapa() {
    google.maps.event.trigger(this.mapa, 'resize');
  }

}
