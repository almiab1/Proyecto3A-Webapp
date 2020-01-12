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
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MapaService
} from '../../../core/services/Mapa.service';
import {
  LocalizadorGPS
} from '../../../core/services/LocalizadorGPS.service';
import {
  LogicaDeNegocioFake
} from '../../../core/services/LogicaDeNegocioFake.service';
import {
  Storage
} from '@ionic/storage';
import {
  ToastController
} from '@ionic/angular';
import { RutasRealizadas } from '../../../models/Rutas';
import { RutasPreviamenteCreadas } from '../../../models/Rutas';
import { DataService } from './../../../core/services/data.service';
// ----------------------------
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
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;
  currentLocation: any = {
    lat: 0,
    long: 0
  };

  // Updates position traqueo posicion
  watchUpdates: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoute = [];
  previousTracks: RutasRealizadas[] = [];
  rutaSeleccionadaTiempo: any;

  // Rutas predefinidas
  rutaSeleccionadaPredefinida: any;
  rutasPredefinidas: RutasPreviamenteCreadas[];

  // Constructor
  constructor(
    private gps: LocalizadorGPS,
    private server: LogicaDeNegocioFake,
    private storage: Storage,
    public toastController: ToastController,
    public dataService: DataService
  ) {
    // Actualizados la posicion del icono cuando se cambia la ubicación3
    if (this.currentLocation !== undefined) {
      setInterval(() => {
        this.gps.obtenerMiPosicionGPS().then((resp) => {

          if (this.currentLocation.lat !== resp.lat || this.currentLocation.long !== resp.long) {
            this.currentLocation.lat = resp.lat;
            this.currentLocation.long = resp.long;

            this.mapa.centrarEn({
              lat: this.currentLocation.lat,
              lng: this.currentLocation.long
            });

            const marcadorName = 'Posicion Actual';

            this.mapa.eliminarMarcador(marcadorName);
            this.mapa.anyadirMarcador(
              marcadorName, {
                lat: this.currentLocation.lat,
                lng: this.currentLocation.long
              }, 'assets/icon/gpsIcon.svg'
            );
          }
        });
      }, 5000);
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.loadHistoricRoutes();
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // ngAfterViewInit()
  // metodo que se ejecuta al inicial la vista, inicializar componentes
  // ----------------------------------------------------------------------------------------------
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {

    this.loadHistoricRoutes();

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
  // onSelectCapaChange()
  // metodo para controlar el select de capas
  // ----------------------------------------------------------------------------------------------
  onSelectCapaChange(valores) {
    this.mapa.ocultarTodasLasCapas();
    valores.forEach(capa => {
      this.mapa.mostrarCapa(capa);
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // onSelectRuta()
  // metodo para controlar el select de rutas
  // ----------------------------------------------------------------------------------------------
  onSelectRuta() {
    console.log('INICIO ONSELECTRUTA');
    let ruta: any[];
    this.previousTracks.forEach(element => {
      console.log(element)
      if (element.nombreRuta == this.rutaSeleccionadaTiempo) {
        ruta = element.ruta
      }
    });
    this.showHistoryRoute(ruta);
    console.log('FIN ONSELECTRUTA');
  }

  // ----------------------------------------------------------------------------------------------
  // Comparar los objetos de rutas
  // ----------------------------------------------------------------------------------------------
  compareById(o1, o2) {
    return o1.finished === o2.finished;
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // startTracking()
  // metodo para comenzar el monitoreo de ruta
  // ----------------------------------------------------------------------------------------------
  startTracking() {
    this.isTracking = true; // cambiamos el estado a monitoreo
    this.trackedRoute = [];

    this.watchUpdates = this.gps.watchLocation(this.watchUpdates).subscribe((resp) => {
      if (resp !== undefined) {

        // Actualizamos nuestra posicion actual
        this.currentLocation.lat = resp.coords.latitude;
        this.currentLocation.long = resp.coords.longitude;

        this.trackedRoute.push({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }); // Añadimos un punto en la ruta

        this.mapa.centrarEn({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        });
        this.currentMapTrack = this.mapa.pintarRuta(this.trackedRoute, this.currentMapTrack); // Pintamos la ruta
      }
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // stoptTracking()
  // metodo para parar el monitoreo de ruta
  // ----------------------------------------------------------------------------------------------
  stopTracking() {
    let date = new Date();
    const newRoute:RutasRealizadas = {
      nombreRuta: 'Ruta del ' + date.toLocaleString(),
      ruta: this.trackedRoute
    };
    this.previousTracks.push(newRoute);

    this.server.postRuta(newRoute,1);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false; // cambiamos el estado a no monitoreo
    this.gps.stopLocationWatch(this.watchUpdates); // paramos de monitorear
    this.mapa.quitarRuta(this.currentMapTrack);
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // ruta: objeto --> showHistoryRoute()
  // metodo para mostrar el historial de rutas realizadas
  // ----------------------------------------------------------------------------------------------
  showHistoryRoute(route) {
    this.currentMapTrack = this.mapa.pintarRuta(route, this.currentMapTrack);
    this.mapa.refrescarMapa();
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // loadHistoricRoutes()
  // metodo para cargar de la bd las rutas ya realizadas
  // ----------------------------------------------------------------------------------------------
  loadHistoricRoutes() {
    this.previousTracks = this.cargarRutasPrevias();
    this.rutasPredefinidas = this.cargarRutasPreviamenteCreadas();
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // cargarRutasPreviamenteCreadas()
  // metodo para cargar de la bd las rutas predefinidas
  // ----------------------------------------------------------------------------------------------
  cargarRutasPreviamenteCreadas() {
    let rutas: RutasPreviamenteCreadas[];

    rutas = [
      {
        nombreRuta: 'Ruta Novelda',
        puntoInicial: {lat: 38.381392, lng: -0.768067},
        wayPoints: [{location: {lat: 38.381723, lng: -0.774593}}, {location: {lat: 38.384118, lng: -0.774465}}],
        puntoFinal: {lat: 38.383905, lng: -0.770708}
      }
    ];

    // this.server.getRutasUsuario(0,this.dataService.idUser).subscribe(
    //   res => {
    //     rutas = res;
    //   },
    //   err => console.log(err),
    // );
    return rutas;
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // cargarRutasPrevias()
  // metodo para cargar de la bd las rutas ya hechas
  // ----------------------------------------------------------------------------------------------
  cargarRutasPrevias() {
    let rutas: RutasRealizadas[];

    this.storage.get('routes').then(data => {
      if (data) {
        rutas = data;
      }
    }, err => console.error(err));

    // this.server.getRutasUsuario(0,this.dataService.idUser).subscribe(
    //   res => {
    //     rutas = res;
    //   },
    //   err => console.log(err),
    // );
    console.log('cargarRutasPrevias -------------------------------------')
    console.log(rutas);
    if (rutas == undefined){rutas = []}
    return rutas;
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // onSelectRutaPredefinida()
  // Metodo para seleccionar una ruta predefinida
  // ----------------------------------------------------------------------------------------------
  onSelectRutaPredefinida() {
    for (const element of this.rutasPredefinidas) {
      if (element.nombreRuta === this.rutaSeleccionadaPredefinida) {
        const puntos = [];
        puntos.push(element.puntoInicio);
        for (let i = 0; i < element.wayPoints.length; i++) {
          puntos[i + 1] = element.wayPoints[i].location;
        }
        puntos.push(element.puntoFinal);
        let contaminacion: any;
        this.server.getEstimacionCalidadAire(puntos).subscribe(res => {
          contaminacion = res;
          this.mapa.calcularYMostrarRutasPredefinida(element, contaminacion.calidadDelAire);
        });
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // limpiarMapa()
  // metodo para limpiar el mapa
  // ----------------------------------------------------------------------------------------------
  limpiarMapa() {
    this.mapa.limpiarMapa(this.currentMapTrack);
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // Testing
  // ----------------------------------------------------------------------------------------------
  async presentToast() {
    let testData;

    this.storage.set('test', [{
      lat: 1,
      long: 2
    }, {
      lat: 3,
      long: 4
    }]);

    this.storage.get('test').then(data => {
      if (data) {
        testData = data;
        console.log('------------DENTRO DE ASIGNACION DATA------------------');
        console.table(testData);
        console.log('------------------------------');
      }
    });
    const toast = await this.toastController.create({
      message: 'TEST VER RUTAS PREVIAS',
      duration: 2000
    });
    console.log('------------FUERA DE ASIGNACION DATA------------------');
    console.table(testData);
    console.log('------------------------------');
    toast.present();
  }
}
