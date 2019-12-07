// ----------------------------------------------------------------------------
// editar.component.ts
// Controlador modal editarr
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import {
  Component,
  OnInit
} from '@angular/core';
import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
import {
  NavParams,
  ModalController
} from '@ionic/angular';
// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-modal-nodos',
  templateUrl: './modal-nodos.component.html',
  styleUrls: ['./modal-nodos.component.scss'],
})
// ----------------------------------------------------------------------------
// Class ModalNodosComponent
// ----------------------------------------------------------------------------
export class ModalNodosComponent implements OnInit {

  // Propiedades
  nombreNodo: string;
  tipoNodo: string;
  usuarioNodo: string;
  tituloComponent: string;
  tipoModal: string;

  // ----------------------------------------------------------------------------
  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private serve: LogicaDeNegocioFake
  ) {}
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {
    console.table(this.navParams);
    // tslint:disable-next-line: radix
    this.tipoNodo = this.navParams.data.tipoNodo;
    this.nombreNodo = this.navParams.data.nombreNodo;
    this.usuarioNodo = this.navParams.data.usuarioNodo;
    this.tituloComponent = this.navParams.data.titulo;
    this.tipoModal = this.navParams.data.tipoModal;
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // radioGroupChange()
  // ----------------------------------------------------------------------------
  radioGroupChange(event) {
    this.tipoNodo = event.detail;
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    switch (tipoBoton) {
      case 'guardar': {
        console.log('----------Boton guardar modal------------');

        let nuevoSensor = {
          idTipoSensor: this.tipoNodo,
          idUsuario: this.usuarioNodo,
          idSensor: this.nombreNodo
        };
        this.serve.darDeAltaSensor(nuevoSensor);

        await this.modalController.dismiss(onClosedData);
        break;
      }
      case 'eliminar': {
        console.log('----------Boton eliminar modal------------');

        let sensor = this.nombreNodo;

        this.serve.darDeBajaSensor(sensor);

        await this.modalController.dismiss(onClosedData);
        break;
      }
      default: {
        await this.modalController.dismiss(onClosedData);
        break;
      }
    }
  }
  // ----------------------------------------------------------------------------

}