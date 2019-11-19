// ----------------------------------------------------------------------------
// editar-usuarios.component.ts
// Controlador modal editar usuarios
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import {
  ModalController,
  NavParams
} from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss'],
})
// ----------------------------------------------------------------------------
// Class EditarUsuariosComponent
// ----------------------------------------------------------------------------
export class EditarUsuariosComponent implements OnInit {

  // Propiedades
  nombreUser: string;
  emailUsuario: string;
  nodosUser: string;
  tituloComponent: string;

  // ----------------------------------------------------------------------------
  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {}
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {
    console.table(this.navParams);
    // tslint:disable-next-line: radix
    this.emailUsuario = this.navParams.data.email;
    this.nombreUser = this.navParams.data.nombre;
    this.nodosUser = this.navParams.data.nodos;
    this.tituloComponent = this.navParams.data.titulo;
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    switch (tipoBoton) {
      case 'aceptar': {
        console.log('----------Boton aceptar modal------------');
        await this.modalController.dismiss(onClosedData);
        break;
      }
      case 'cancelar': {
        console.log('----------Boton cancelar modal------------');
        await this.modalController.dismiss(onClosedData);
        break;
      }
      default: {
        console.log('----------Default------------');
        await this.modalController.dismiss(onClosedData);
        break;
      }
    }
  }
  // ----------------------------------------------------------------------------

}