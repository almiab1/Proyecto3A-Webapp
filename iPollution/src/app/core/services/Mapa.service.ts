// ----------------------------------------------------------------------------------------------
//  Mapa.service.ts
//  Implementación: Carlos Tortosa Micó
//  Equipo 4
//  iPollution
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Imports
// ----------------------------------------------------------------------------------------------
import {
  Injectable,
  ElementRef
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  LogicaDeNegocioFake
} from './LogicaDeNegocioFake.service';
declare var google;
@Injectable({
  providedIn: 'root'
})
// ----------------------------------------------------------------------------------------------
// Clase MapaService
// ----------------------------------------------------------------------------------------------
export class MapaService {

  // ----------------------------------------------------------------------------------------------
  // PARTE PRIVADA
  // ----------------------------------------------------------------------------------------------

  private mapa: any;
  private puntoCentral: any;
  private capasDeMediciones: Array < any > ;
  private marcadores: Array < any > ;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay;
  server: LogicaDeNegocioFake;
  trafficLayer: any;
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // Constructor
  // ----------------------------------------------------------------------------------------------
  constructor(posicion: any, settings: any, elementoHtml: ElementRef) {
    this.puntoCentral = posicion;
    this.mapa = new google.maps.Map(elementoHtml, {
      zoom: settings.zoom,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
    });

    this.centrarEn(this.puntoCentral);

    this.capasDeMediciones = new Array < any > ();

    this.marcadores = new Array < any > ();
  }


  // ----------------------------------------------------------------------------------------------
  // posicion:Posicion -> centrarEn() -> void
  // ----------------------------------------------------------------------------------------------
  centrarEn(posicion: any) {
    this.mapa.setCenter(posicion);
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // void -> refrescarMapa() -> void
  // ----------------------------------------------------------------------------------------------
  refrescarMapa() {
    google.maps.event.trigger(this.mapa, 'resize'); // Pequeño truco para forzar un refresh y redibujado de los mapas de Google
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // posicion:Posicion -> anyadirMarcador ->
  // ----------------------------------------------------------------------------------------------
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
    // ----------------------------------------------------------------------------------------------

  }

  // ----------------------------------------------------------------------------------------------
  // nombreMarcador:string -> eliminarMarcador ->
  // ----------------------------------------------------------------------------------------------
  eliminarMarcador(nombreMarcador: string) {
    if (this.marcadores[nombreMarcador]) {
      this.marcadores[nombreMarcador].setMap(null);
    }
  }

  // ----------------------------------------------------------------------------------------------
  // medicion: Medicion -> anyadirMedicion -> void
  // ----------------------------------------------------------------------------------------------
  anyadirMedicion(nombreDelGas: string, medicion: any) {

    this.capasDeMediciones[nombreDelGas].layer.data.push({
      location: new google.maps.LatLng(medicion.latitud, medicion.longitud),
      weight: medicion.valorMedido
    });

  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // informacion:Json -> anyadirCapa() -> void
  // ----------------------------------------------------------------------------------------------
  anyadirCapa(informacion: any) {
    const layer = new google.maps.visualization.HeatmapLayer({
      dissipating: informacion.disipado,
      radius: informacion.radio,
      maxIntensity: informacion.maxIntensidad
    });

    this.capasDeMediciones[informacion.nombre] = {
      layer,
      nombre: informacion.nombre
    };
    this.mostrarCapa(informacion.nombre);
  }
  // ----------------------------------------------------------------------------------------------


  // ----------------------------------------------------------------------------------------------
  // nombreDeCapa:string --> eliminarCapa() --> void
  // ----------------------------------------------------------------------------------------------
  borrarCapa(nombreDeCapa: string) {
    if (this.capasDeMediciones[nombreDeCapa]) {
      delete this.capasDeMediciones[nombreDeCapa];
    }
  }
  // ----------------------------------------------------------------------------------------------


  // ----------------------------------------------------------------------------------------------
  // nombreGas:string -> mostrarCapa() -> void
  // ----------------------------------------------------------------------------------------------

  mostrarCapa(nombreGas: string) {
    if (this.capasDeMediciones[nombreGas]) {

      this.capasDeMediciones[nombreGas].layer.setMap(this.mapa);
      this.refrescarMapa();

    }
  }

  // ----------------------------------------------------------------------------------------------


  // ----------------------------------------------------------------------------------------------
  // nombreGas:string -> ocultarCapa() -> void
  // ----------------------------------------------------------------------------------------------

  ocultarCapa(nombreGas: string) {
    if (this.capasDeMediciones[nombreGas]) {

      this.capasDeMediciones[nombreGas].layer.setMap(null);
      this.refrescarMapa();

    }
  }

  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // nombreGas:string -> ocultarCapa() -> void
  // ----------------------------------------------------------------------------------------------

  ocultarTodasLasCapas() {
    for (const i in this.capasDeMediciones) {
      if (this.capasDeMediciones.hasOwnProperty(i)) {
        this.ocultarCapa(this.capasDeMediciones[i].nombre);
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // anyadirInformacionMarcador()
  // ----------------------------------------------------------------------------------------------
  anyadirInformacionMarcador(marcador: void, contenido: String) {

    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    google.maps.event.addListener(marcador, 'click', () => {
      infoWindow.open(this.mapa, marcador);
    });

  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // ruta: array -> pintarRuta() -> void
  // ----------------------------------------------------------------------------------------------
  pintarRuta(ruta, currentMapTrack) {

    if (currentMapTrack) {
      currentMapTrack.setMap(null);
    }

    if (ruta.length > 1) {
      currentMapTrack = new google.maps.Polyline({
        path: ruta,
        geodesic: true,
        trokeColor: '#ff0000',
        strokeOpacity: 0.6,
        strokeWeight: 6,
        fillColor: '#ff0000',
        fillOpacity: 0.30
      });
      currentMapTrack.setMap(this.mapa);
    }
    this.refrescarMapa();

    return currentMapTrack;
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // ruta:array -> quitarRuta() -> void
  // ----------------------------------------------------------------------------------------------
  quitarRuta(currentMapTrack) {
    currentMapTrack.setMap(null);
    this.refrescarMapa();
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // calcularYMostrarRutasPredefinida()
  // metodo para ver las rutas predefinidas
  // ----------------------------------------------------------------------------------------------
  calcularYMostrarRutasPredefinida(ruta: any, contaminacion) {

    this.activarDesactivarTrafico(false);

    const that = this;
    if (contaminacion === 0) {
      that.directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: 'green',
          strokeOpacity: 0.5,
          strokeWeight: 6,
        }
      });
    }
    if (contaminacion === 1) {
      that.directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: 'orange',
          strokeOpacity: 0.5,
          strokeWeight: 8,
        }
      });
    }
    if (contaminacion === 2) {
      that.directionsDisplay = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: 'red',
          strokeOpacity: 0.5,
          strokeWeight: 8,
        }
      });
    }
    this.directionsService.route({
      origin: ruta.puntoInicial,
      destination: ruta.puntoFinal,
      waypoints: ruta.wayPoints,
      travelMode: 'DRIVING',
      optimizeWaypoints: true,
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
        that.directionsDisplay.setMap(this.mapa);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // currentMapTrack: ruta --> culimpiarMapa()
  // metodo para limpiar el mapa
  // ----------------------------------------------------------------------------------------------
  limpiarMapa(currentMapTrack: any) {
    this.directionsDisplay.setMap(null);
    this.quitarRuta(currentMapTrack);
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // ActivarDesactivarTrafico
  // ----------------------------------------------------------------------------------------------
  activarDesactivarTrafico(activoInactivo){
    if(activoInactivo) {
      this.trafficLayer = new google.maps.TrafficLayer();
      this.trafficLayer.setMap(this.mapa);
    } else {
      this.trafficLayer.setMap(null);
    }
  }
  //----------------------------------------------------------------------------------------------
}