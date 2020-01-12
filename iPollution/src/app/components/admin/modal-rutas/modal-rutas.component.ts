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
  IonSelect,
} from '@ionic/angular';
import {
  MapaService
} from '../../../core/services/Mapa.service';
import {
  Ruta,
  RutasPreviamenteCreadas
} from '../../../models/Rutas';
import {
  DataService
} from './../../../core/services/data.service';
import {
  ToastController
} from '@ionic/angular';
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

  // Selects
  @ViewChild('selectPredefinidas', {
    static: false
  }) selectPredefinidas: IonSelect;
  @ViewChild('selectRealizadas', {
    static: false
  }) selectRealizadas: IonSelect;
  @ViewChild('selectPredefinidasAEliminar', {
    static: false
  }) selectPredefinidasAEliminar: IonSelect;

  // Rutas
  currentMap = null;
  rutasPreviasRealizadas: Ruta[] = [];
  rutaSeleccionadaTiempo: any;
  rutaSeleccionadaPredefinida: any;
  rutasPredefinidas: RutasPreviamenteCreadas[];
  selectPredefinidasAEliminarVar: any;

  // Posicion
  currentLocation: any = {
    lat: 0,
    long: 0
  };

  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private server: LogicaDeNegocioFake,
    public gps: LocalizadorGPS,
    public dataService: DataService,
    private toastController: ToastController

  ) {
    this.platform = this.dataService.platform;
  }

  ngOnInit() {
    this.tituloComponent = this.navParams.data.titulo;
    this.tipoModal = this.navParams.data.tipoModal;
  }

  ngAfterViewInit(): void {
    this.loadHistoricRoutes();

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

    this.server.getRutas(0, undefined).subscribe(
      res => {
        if (res.length != 0 || res != undefined) {
          res.forEach(element => {

            let rutaPath = JSON.parse(element.ruta);

            let rutaPrevia: RutasPreviamenteCreadas = {
              nombreRuta: element.nombreRuta,
              puntoInicial: rutaPath.ruta[0],
              puntoFinal: rutaPath.ruta[rutaPath.ruta.length - 1],
              wayPoints: [],
            };

            if (rutaPath.ruta.length >= 3) {
              for (let i = 1; i <= rutaPath.ruta.length - 1; i++) {
                rutaPrevia.wayPoints.push({
                  location: rutaPath.ruta[i]
                });
              }
            }

            rutas.push(rutaPrevia);


          });
        }
      },
      err => console.log(err),
    );

    console.log

    if (rutas.length == 0) {
      this.mostrarToast('Sin resultados', 1500);
    }

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
        if (res.length == 0) {
          this.mostrarToast('Sin resultados', 1500);
        }

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
        ruta = element.ruta;
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
    for (const element of this.rutasPredefinidas) {
      if (element.nombreRuta === this.rutaSeleccionadaPredefinida) {
        const puntos = [];
        puntos.push(element.puntoInicial);
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
  // Comparar los objetos de rutas
  // ----------------------------------------------------------------------------------------------
  compareById(o1, o2) {
    return o1.finished === o2.finished
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // abrirSelect()
  // metodo para limpiar el mapa
  // ----------------------------------------------------------------------------------------------
  abrirSelect(select) {
    switch (select) {
      case 'selectPredefinidas': {
        console.log('----------Select selectPredefinidas------------');
        this.selectPredefinidas.open();
        break;
      }
      case 'selectRealizadas': {
        console.log('----------Select selectRealizadas------------');
        this.selectRealizadas.open();
        break;
      }
      case 'selectPredefinidasAEliminar': {
        console.log('----------Select selectCapas------------');
        this.selectPredefinidasAEliminar.open();
        break;
      }
      default: {
        console.log('----------Default------------');

        break;
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // centrarEn()
  // metodo para centrarte en el mapa
  // ----------------------------------------------------------------------------------------------
  centrarEn() {
    this.gps.obtenerMiPosicionGPS().then((resp) => {

      this.currentLocation.lat = resp.lat;
      this.currentLocation.long = resp.long;

      this.mapa.centrarEn({
        lat: this.currentLocation.lat,
        lng: this.currentLocation.long
      });
    });
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // cambiarModoRutas()
  // seleccionador de modo
  // ----------------------------------------------------------------------------------------------
  cambiarModoRutas(valores) {
    this.tipoModal = valores;
    if(this.tipoModal == 'editar') {
      this.loadHistoricRoutes();
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // onSelectRutaPredefinidaAEliminar()
  // Metodo para seleccionar una ruta predefinida para eliminarla
  // ----------------------------------------------------------------------------------------------
  onSelectRutaPredefinidaAEliminar(){
    for (const element of this.rutasPredefinidas) {
      if (element.nombreRuta === this.rutaSeleccionadaPredefinida) {
        console.log(element.nombreRuta)
        this.server.eliminarRuta(element.nombreRuta);
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // mostrarToast()
  // metodo para mostrar el toast
  // ----------------------------------------------------------------------------------------------
  async mostrarToast(texto: string, duracion: number) {
    const toast = await this.toastController.create({
      message: texto,
      duration: duracion
    });

    toast.buttons = [{
      text: 'Cerrar',
      role: 'cancel',
      handler: () => {
        toast.dismiss();
      }
    }];

    toast.present();
  }

}