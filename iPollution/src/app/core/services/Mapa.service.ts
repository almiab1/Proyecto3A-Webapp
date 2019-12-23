/*
  Mapa.service.ts
  Implementación: Carlos Tortosa Micó
  Equipo 4
  iPollution
*/

import {
  Injectable,
  ElementRef
} from '@angular/core';

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
  private capasDeMediciones: Array < any > ;
  private marcadores: Array < any > ;

  //////////////////////


  constructor(posicion: any, settings: any, elementoHtml: ElementRef) {
    this.puntoCentral = posicion;
    this.mapa = new google.maps.Map(elementoHtml, {
      zoom: settings.zoom,
      zoomControl: false
    });

    this.centrarEn(this.puntoCentral);

    this.capasDeMediciones = new Array < any > ();

    this.marcadores = new Array < any > ();
  }


  // -----------------------------------------
  // posicion:Posicion -> centrarEn() -> void
  // ------------------------------------------
  centrarEn(posicion: any) {
    this.mapa.setCenter(posicion);
    // this.eliminarMarcador('Posicion Actual');
    this.anyadirMarcador(
      'Posicion Actual', {
        lat: posicion.lat,
        lng: posicion.lng
      }, 'assets/icon/gpsIcon.svg'
    );
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
  anyadirMarcador(nombre: string, posicion: any, iconoUrl: string) {
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

    return marcador;
    // -------------------------------------------

  }

  eliminarMarcador(nombreMarcador: any) {
    if (this.marcadores[nombreMarcador]) {
      this.marcadores[nombreMarcador].setMap(null);
    }
  }

  // -----------------------------------------
  // medicion: Medicion -> anyadirMedicion -> void
  // ------------------------------------------
  anyadirMedicion(nombreDelGas: string, medicion: any) {

    this.capasDeMediciones[nombreDelGas].layer.data.push({
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

    this.capasDeMediciones[informacion.nombre] = {
      layer: layer,
      nombre: informacion.nombre
    };
    this.mostrarCapa(informacion.nombre);
  }
  // ------------------------------------------

  // -----------------------------------------
  // nombreGas:string -> mostrarCapa() -> void
  // ------------------------------------------

  mostrarCapa(nombreGas: string) {
    if (this.capasDeMediciones[nombreGas]) {

      this.capasDeMediciones[nombreGas].layer.setMap(this.mapa);
      this.refrescarMapa();

    }
  }

  // ------------------------------------------


  // -----------------------------------------
  // nombreGas:string -> ocultarCapa() -> void
  // ------------------------------------------

  ocultarCapa(nombreGas: string) {
    if (this.capasDeMediciones[nombreGas]) {

      this.capasDeMediciones[nombreGas].layer.setMap(null);
      this.refrescarMapa();

    }
  }

  // ------------------------------------------

  // -----------------------------------------
  // nombreGas:string -> ocultarCapa() -> void
  // ------------------------------------------

  ocultarTodasLasCapas() {
    for (const i in this.capasDeMediciones) {
      if (this.capasDeMediciones.hasOwnProperty(i)) {
        this.ocultarCapa(this.capasDeMediciones[i].nombre);
      }
    }
  }

  // ------------------------------------------
  // ------------------------------------------
  // tslint:disable-next-line: ban-types
  anyadirInformacionMarcador(marcador: void, contenido: String) {

    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    google.maps.event.addListener(marcador, 'click', () => {
      infoWindow.open(this.mapa, marcador);
    });

  }
  // ------------------------------------------

  // -----------------------------------------
  // ruta: array -> pintarRuta() -> void
  // ------------------------------------------
  pintarRuta(ruta, currentMapTrack) {
    if (currentMapTrack) {
      currentMapTrack.setMap(null);
    }

    if (ruta.length > 1) {
      currentMapTrack = new google.maps.Polyline({
        path: ruta,
        geodesic: true,
        strokeColor: '#2196f2',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      currentMapTrack.setMap(this.mapa);
    }
    this.refrescarMapa();
  }
  // ------------------------------------------

  // -----------------------------------------
  // ruta:sarray -> quitarRuta() -> void
  // ------------------------------------------
  quitarRuta(currentMapTrack) {
    currentMapTrack.setMap(null);
    this.refrescarMapa();
  }
}