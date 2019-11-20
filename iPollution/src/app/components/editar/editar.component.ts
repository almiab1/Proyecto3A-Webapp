import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
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
  NavParams,
  ModalController
} from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';
// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
// ----------------------------------------------------------------------------
// Class EditarComponent
// ----------------------------------------------------------------------------
export class EditarComponent implements OnInit {

  // Propiedades
  nombreNodo: string;
  tipoNodo: string;
  usuarioNodo: string;
  tituloComponent: string;

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
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    switch (tipoBoton) {
      case 'guardar': {
        console.log('----------Boton guardar modal------------');

        let nuevoSensor = {
            descripcion: 'Ozono',
            idUsuario: '1234@gmail.com',
            idSensor: 3
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