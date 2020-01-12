import { DataService } from './../../../core/services/data.service';
// ----------------------------------------------------------------------------------------------
// modal-rutas.component.ts
// Controlador modal rutas
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------------------------
import {
  LogicaDeNegocioFake
} from './../../../core/services/LogicaDeNegocioFake.service';
import {
  LocalizadorGPS
} from './../../../core/services/LocalizadorGPS.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ModalController,
  NavParams,
} from '@ionic/angular';
import {
  MapaService
} from '../../../core/services/Mapa.service';
import {
  Ruta,
  RutasPreviamenteCreadas
} from '../../../models/Rutas';
// ----------------------------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------------------------
@Component({
  selector: 'app-modal-rutas',
  templateUrl: './modal-rutas.component.html',
  styleUrls: ['./modal-rutas.component.scss'],
})
// ----------------------------------------------------------------------------------------------
// Class ModalRutasComponent
// ----------------------------------------------------------------------------------------------
export class ModalRutasComponent implements OnInit {

  // Propiedades
  platform: string;
  tituloComponent: string;
  tipoModal: string;
  mapa: MapaService;
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;


  //Rutas
  currentMap = null;
  rutasPreviasRealizadas: Ruta[] = [];
  rutaSeleccionadaTiempo: any;
  rutaSeleccionadaPredefinida: any;
  rutasPredefinidas: RutasPreviamenteCreadas[];

  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private server: LogicaDeNegocioFake,
    public gps: LocalizadorGPS,
    public dataService: DataService

  ) {
    this.platform = this.dataService.platform;
  }

  ngOnInit() {
    this.tituloComponent = this.navParams.data.titulo;
    this.tipoModal = this.navParams.data.tipoModal;
  }

  ngAfterViewInit(): void {
    this.gps.obtenerMiPosicionGPS().then((resp) => {
      this.gps.lat = resp.lat;
      this.gps.long = resp.long;

      this.mapa = new MapaService({
        lat: resp.lat,
        lng: resp.long
      }, {
        zoom: 15
      }, this.mapElement.nativeElement);
    })
  }

  // ----------------------------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  // ----------------------------------------------------------------------------------------------
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    switch (tipoBoton) {
      // case 'guardar': {
      //   console.log('----------Boton guardar modal------------');

      //   this.serve.darDeAltaUsuario(user);

      //   await this.modalController.dismiss(onClosedData);
      //   break;
      // }
      default: {
        console.log('----------Default------------');

        await this.modalController.dismiss(onClosedData);
        break;
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // ruta: objeto --> showHistoryRoute()
  // metodo para mostrar el historial de rutas realizadas
  // ----------------------------------------------------------------------------------------------
  showHistoryRoute(route) {
    this.currentMap = this.mapa.pintarRuta(route, this.currentMap);
    this.mapa.refrescarMapa();
  }
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // loadHistoricRoutes()
  // metodo para cargar de la bd las rutas ya realizadas
  // ----------------------------------------------------------------------------------------------
  loadHistoricRoutes() {
    this.rutasPredefinidas = this.cargarRutasPreviamenteCreadas();
    this.rutasPreviasRealizadas = this.cargarRutasPrevias();
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // eliminarRuta()
  // metodo para cargar de la bd las rutas predefinidas
  // ----------------------------------------------------------------------------------------------
  eliminarRuta(nombreRuta) {
    this.server.eliminarRuta(nombreRuta);
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // cargarRutasPreviamenteCreadas()
  // metodo para cargar de la bd las rutas predefinidas
  // ----------------------------------------------------------------------------------------------
  cargarRutasPreviamenteCreadas() {
    let rutas: RutasPreviamenteCreadas[] = [];

    //Ruta test
    rutas.push({
      nombreRuta: 'Ruta Novelda',
      puntoInicial: {
        lat: 38.381392,
        lng: -0.768067
      },
      wayPoints: [{
        location: {
          lat: 38.381723,
          lng: -0.774593
        }
      }, {
        location: {
          lat: 38.384118,
          lng: -0.774465
        }
      }],
      puntoFinal: {
        lat: 38.383905,
        lng: -0.770708
      }
    });


    this.server.getRutas(0, undefined).subscribe(
      res => {
        if (res.length != 0 || res != undefined) {
          res.forEach(element => {

            let rutaPrevia: RutasPreviamenteCreadas = {
              nombreRuta: element.nombreRuta,
              puntoInicial: element.ruta[0],
              puntoFinal: element.ruta[element.ruta.length - 1],
              wayPoints: [],
            };

            if (element.ruta.length >= 3) {
              for (let i = 1; i <= element.ruta.length - 1; i++) {
                rutaPrevia.wayPoints.push({
                  location: element.ruta[i]
                });
              }
            }

            rutas.push(rutaPrevia);

          });
        }
      },
      err => console.log(err),
    );

    return rutas;
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // cargarRutasPrevias()
  // metodo para cargar de la bd las rutas ya hechas
  // ----------------------------------------------------------------------------------------------
  cargarRutasPrevias() {
    let rutas: Ruta[] = [];

    this.server.getRutas(1, 'canut@gmail.com').subscribe(
      res => {
        rutas = res;
      },
      err => console.log(err),
    );

    return rutas;
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // onSelectRuta()
  // metodo para controlar el select de rutas
  // ----------------------------------------------------------------------------------------------
  onSelectRuta() {
    console.log('INICIO ONSELECTRUTA');
    let ruta: any[];
    this.rutasPreviasRealizadas.forEach(element => {
      console.log(element)
      if (element.nombreRuta == this.rutaSeleccionadaTiempo) {
        ruta = element.ruta
      }
    });
    this.showHistoryRoute(ruta);
    console.log('FIN ONSELECTRUTA');
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // onSelectRutaPredefinida()
  // Metodo para seleccionar una ruta predefinida
  // ----------------------------------------------------------------------------------------------
  onSelectRutaPredefinida() {
    let ruta: any;

    this.rutasPredefinidas.forEach(element => {
      if (element.nombreRuta === this.rutaSeleccionadaPredefinida) {
        ruta = element;
      }
    });

    this.mapa.calcularYMostrarRutasPredefinida(ruta);
  }
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  // Comparar los objetos de rutas
  // ----------------------------------------------------------------------------------------------
  compareById(o1, o2) {
    return o1.finished === o2.finished
  }
  // ----------------------------------------------------------------------------------------------

}