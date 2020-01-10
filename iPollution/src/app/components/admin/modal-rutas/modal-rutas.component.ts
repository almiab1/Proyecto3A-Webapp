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
  tituloComponent: string;
  tipoModal: string;
  mapa: MapaService;
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;

  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private server: LogicaDeNegocioFake,
    public gps: LocalizadorGPS

  ) {

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

    // ----------------------------------------------------------------------------
    // tipoBoton --> closeModal()
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
    // ----------------------------------------------------------------------------

  }