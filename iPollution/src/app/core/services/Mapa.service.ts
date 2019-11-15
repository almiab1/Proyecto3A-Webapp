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

  ///////////////////////
  // PARTE PRIVADA
  //////////////////////

  private mapa: any;
  private puntoCentral: any;
  private datosInterpolacion: Array<any>;
  private mapaDeCalor: any;
  

  //////////////////////


  constructor(posicion: any , settings: any, elementoHtml: ElementRef) {
    this.datosInterpolacion = new Array<any>();
    this.puntoCentral = posicion;
    this.mapa = new google.maps.Map(elementoHtml, {
      zoom: settings.zoom
    });

    this.centrarEn(this.puntoCentral);

    this.mapaDeCalor = new google.maps.visualization.HeatmapLayer({
      data: this.datosInterpolacion,
      dissipating: true,
      radius: 80,
      maxIntensity: 900
    });

    this.mapaDeCalor.setMap(this.mapa);
  }


  // -----------------------------------------
  // posicion:Posicion -> centrarEn() -> void
  // ------------------------------------------
  centrarEn(posicion: any) {
    this.mapa.setCenter(posicion);
  }
  // -------------------------------------------

  // -----------------------------------------
  // void -> refrescarMapa() -> void
  // ------------------------------------------
  refrescarMapa() {
    google.maps.event.trigger(this.mapa, 'resize'); // Pequeño truco para forzar un refresh y redibujado de los mapas de Google
  }
  // ------------------------------------------

  // -----------------------------------------
  // posicion:Posicion -> anyadirMarcador -> void
  // ------------------------------------------
  anyadirMarcador(posicion: any, iconoUrl: string) {
    const icono = {
      url: iconoUrl,
      scaledSize: new google.maps.Size(40, 40)
    };

    let marcador = new google.maps.Marker({
      icon: icono,
      map: this.mapa,
      position: posicion
    });

    this.refrescarMapa();
    // -------------------------------------------

  }

  // -----------------------------------------
  // medicion: Medicion -> anyadirMedicion -> void
  // ------------------------------------------
  anyadirMedicion(medicion: any) {

   this.datosInterpolacion.push({
     location: new google.maps.LatLng(medicion.latitud, medicion.longitud),
     weight: medicion.valorMedido
   });

  }
  // ------------------------------------------
}
