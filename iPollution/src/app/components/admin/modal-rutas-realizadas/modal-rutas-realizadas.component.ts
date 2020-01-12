// ----------------------------------------------------------------------------------------------
// modal-rutas-realizadas.component.ts
// Controlador modal rutas realizadas por el usuario seleccionado
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------------------------
import { LogicaDeNegocioFake } from 'src/app/core/services/LogicaDeNegocioFake.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapaService } from './../../../core/services/Mapa.service';
import { DataService } from './../../../core/services/data.service';
import { LocalizadorGPS } from 'src/app/core/services/LocalizadorGPS.service';
import { Ruta } from './../../../models/Rutas';
// ----------------------------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------------------------
@Component({
  selector: 'app-modal-rutas-realizadas',
  templateUrl: './modal-rutas-realizadas.component.html',
  styleUrls: ['./modal-rutas-realizadas.component.scss'],
})
// ----------------------------------------------------------------------------------------------
// Class ModalRutasRealizadasComponent
// ----------------------------------------------------------------------------------------------
export class ModalRutasRealizadasComponent implements OnInit {

  // Propiedades
  public nombreUser: string;
  public idUsuario: string;

  // Mapa
  mapa: MapaService;
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;

  // Rutas
  rutas: Ruta[] = [];
  rutaSeleccionadaTiempo: any;
  currentMap = null;

  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private server: LogicaDeNegocioFake,
    public dataService: DataService,
    public gps: LocalizadorGPS,
  ) { }

  // ----------------------------------------------------------------------------------------------
  // Metodos de inicializacion para cargar la vista
  // ----------------------------------------------------------------------------------------------
  ngOnInit() {
    this.idUsuario = this.navParams.data.idUsuario;
    this.nombreUser = this.navParams.data.nombreUser;
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

  // ----------------------------------------------------------------------------------------------
  // loadHistoricRoutes()
  // metodo para cargar de la bd las rutas ya realizadas
  // ----------------------------------------------------------------------------------------------
  loadHistoricRoutes() {
    this.rutas = this.cargarRutas();
  }
  // ---------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // cargarRutas()
  // metodo para cargar de la bd las rutas ya hechas
  // ----------------------------------------------------------------------------------------------
  cargarRutas() {
    let rutas: Ruta[] = [];

    this.server.getRutas(1, this.dataService.idUser).subscribe(
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
    this.rutas.forEach(element => {
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
  // ruta: objeto --> showHistoryRoute()
  // metodo para mostrar el historial de rutas realizadas
  // ----------------------------------------------------------------------------------------------
  showHistoryRoute(route) {
    this.currentMap = this.mapa.pintarRuta(route, this.currentMap);
    this.mapa.refrescarMapa();
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    switch (tipoBoton) {

      default: {
        console.log('----------Default------------');

        await this.modalController.dismiss(onClosedData);
        break;
      }
    }
  }
  // ----------------------------------------------------------------------------------------------

}
