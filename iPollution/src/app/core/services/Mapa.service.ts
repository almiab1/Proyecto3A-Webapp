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
  private capasDeMediciones: Array<any>;
  private marcadores: Array<any>;

  //////////////////////


  constructor(posicion: any , settings: any, elementoHtml: ElementRef) {
    this.puntoCentral = posicion;
    this.mapa = new google.maps.Map(elementoHtml, {
      zoom: settings.zoom
    });

    this.centrarEn(this.puntoCentral);

    this.capasDeMediciones = new Array<any>();

    this.marcadores = new Array<any>();
  }


  // -----------------------------------------
  // posicion:Posicion -> centrarEn() -> void
  // ------------------------------------------
  centrarEn(posicion: any) {
    this.mapa.setCenter(posicion);
    this.refrescarMapa();
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
  anyadirMarcador(nombre: string , posicion: any, iconoUrl: string) {
    const icono = {
      url: iconoUrl,
      scaledSize: new google.maps.Size(40, 40)
    };

    const marcador = new google.maps.Marker({
      icon: icono,
      map: this.mapa,
      position: posicion
    });

    this.marcadores[nombre] = marcador;
    // -------------------------------------------

  }

  // -----------------------------------------
  // medicion: Medicion -> anyadirMedicion -> void
  // ------------------------------------------
  anyadirMedicion(nombreDelGas: string, medicion: any) {

   this.capasDeMediciones[nombreDelGas].data.push({
    location: new google.maps.LatLng(medicion.latitud, medicion.longitud),
    weight: medicion.valorMedido
   });

  }
  // ------------------------------------------

  // -----------------------------------------
  // informacion:Json -> anyadirCapa() -> void
  // ------------------------------------------
  anyadirCapa(informacion: any) {
    const layer = new google.maps.visualization.HeatmapLayer({
      dissipating: informacion.disipado,
      radius: informacion.radio,
      maxIntensity: informacion.maxIntensidad
    });

    this.capasDeMediciones[informacion.nombre] = layer;
    this.mostrarCapa(informacion.nombre);
  }
  // ------------------------------------------

  // -----------------------------------------
  // nombreGas:string -> mostrarCapa() -> void
  // ------------------------------------------

    mostrarCapa(nombreGas: string) {
      if (this.capasDeMediciones[nombreGas]) {

        this.capasDeMediciones[nombreGas].setMap(this.mapa);
        this.refrescarMapa();

      }
    }

  // ------------------------------------------


  // -----------------------------------------
  // nombreGas:string -> ocultarCapa() -> void
  // ------------------------------------------

    ocultarCapa(nombreGas: string) {
      if (this.capasDeMediciones[nombreGas]) {

        this.capasDeMediciones[nombreGas].setMap(null);
        this.refrescarMapa();

      }
    }

  // ------------------------------------------

}
