// ----------------------------
// rutas.page.ts
// Controlador de la vista rutas
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapaService} from '../../../core/services/Mapa.service';
import {LocalizadorGPS} from '../../../core/services/LocalizadorGPS.service';
import {LogicaDeNegocioFake} from '../../../core/services/LogicaDeNegocioFake.service';
import { Storage } from '@ionic/storage';// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
// ----------------------------
// Class RutasPage
// ----------------------------
export class RutasPage implements OnInit {

  // Propiedades
  mapa: MapaService;
  @ViewChild('mapElement', { static: false }) mapElement: ElementRef;
  currentLocation: any = { lat: 0, long: 0 };

  // Updates position
  watchUpdates: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  // Constructor
  constructor(
    private gps: LocalizadorGPS,
    private server: LogicaDeNegocioFake,
    private storage: Storage
  ) {
    storage.set('rute', '1');
    storage.get('rute').then((val) => {
      console.log('Your age is' + val);
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  ngOnInit(): void {}
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.gps.obtenerMiPosicionGPS().then((resp) => {
      this.currentLocation.lat = resp.lat;
      this.currentLocation.long = resp.long;

      this.mapa = new MapaService({
        lat: resp.lat,
        lng: resp.long
      }, {
        zoom: 15
      }, this.mapElement.nativeElement);

      // Marcador posicion actual
      this.mapa.anyadirMarcador(
          'Posicion Actual', {
            lat: this.currentLocation.lat,
            lng: this.currentLocation.long
          }, 'assets/icon/gpsIcon.svg'
      );

      // Genero la capa donde pondre las medidas de ozono
      this.mapa.anyadirCapa({
        nombre: 'o3',
        disipado: true, // Escalado del aspecto de los puntos en funcion del zoom
        radio: 70, // Radio de influencia de cada punto en pixeles sobre el mapa
        maxIntensidad: 1500 // Valor en el cual el color es máximo
      });

      this.mapa.anyadirCapa({
        nombre: 'co',
        disipado: true,
        radio: 90,
        maxIntensidad: 1000
      });

      this.mapa.anyadirCapa({
        nombre: 'so2',
        disipado: true,
        radio: 60,
        maxIntensidad: 800
      });

      // Pido las medidas al servidor y por cada una la añado a la capa de ozono en este caso
      try {
        this.server.getAllMedidas().toPromise().then(data => {
          for (const medida of data) {
            this.mapa.anyadirMedicion('o3', medida);
          }
        });
      } catch (erro) {
        console.error('Error Mapa: ' + erro);
      }
      const medidasCo = [{
        latitud: 39.000466,
        longitud: -0.165349,
        valorMedido: 320
      }, {
        latitud: 39.002577,
        longitud: -0.161285,
        valorMedido: 500
      }, {
        latitud: 38.999102,
        longitud: -0.160547,
        valorMedido: 703
      }];
      const medidasSo2 = [{
        latitud: 39.007554,
        longitud: -0.166646,
        valorMedido: 620
      }, {
        latitud: 39.009055,
        longitud: -0.167912,
        valorMedido: 130
      }, {
        latitud: 39.007703,
        longitud: -0.168824,
        valorMedido: 270
      }];

      medidasCo.forEach(medida => {
        this.mapa.anyadirMedicion('co', medida);
      });

      medidasSo2.forEach(medida => {
        this.mapa.anyadirMedicion('so2', medida);
      });

      this.mapa.ocultarTodasLasCapas();
      this.mapa.mostrarCapa('o3');


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  onSelectCapaChange(valores) {
    this.mapa.ocultarTodasLasCapas();
    valores.forEach(capa => {
      this.mapa.mostrarCapa(capa);
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  startTracking() {
    this.isTracking = true; // cambiamos el estado a monitoreo
    this.trackedRoute = [];

    this.watchUpdates = this.gps.watchLocation(this.watchUpdates).subscribe((resp) => {
      if (resp != undefined) {
        this.trackedRoute.push({ lat: resp.coords.latitude, lng: resp.coords.longitude }); // Añadimos un punto en la ruta
        this.mapa.pintarRuta(this.trackedRoute,this.currentMapTrack); // Pintamos la ruta
      }
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false; // cambiamos el estado a no monitoreo
    this.gps.stopLocationWatch(this.watchUpdates); // paramos de monitorear
    this.currentMapTrack.setMap(null);
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  showHistoryRoute(route) {
    this.mapa.pintarRuta(route, undefined);
    this.mapa.refrescarMapa();
  }
}