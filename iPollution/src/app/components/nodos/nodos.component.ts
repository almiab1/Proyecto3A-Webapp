// ----------------------------------------------------------------------------
// nodos.component.ts
// Controlador modal nodos
// Equipo 4
// Alejandro Mira Abad
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
  EditarComponent
} from './../editar/editar.component';
import {
  ModalController,
  Platform
} from '@ionic/angular';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-nodos',
  templateUrl: './nodos.component.html',
  styleUrls: ['./nodos.component.scss'],
})
// ----------------------------------------------------------------------------
// Class NodosComponent
// ----------------------------------------------------------------------------
export class NodosComponent implements OnInit {
  // Propiedades
  dataReturned: any;
  public nodos: any;
  // ----------------------------------------------------------------------------

  aa = [{
      nombre: 'Nodo001',
      tipo: '01',
      usuario: 'user01'
    },
    {
      nombre: 'Nodo002',
      tipo: '02',
      usuario: 'user02'
    },
    {
      nombre: 'Nodo003',
      tipo: '03',
      usuario: 'user03'
    },
  ];
  // ----------------------------------------------------------------------------
  // Contructor
  constructor(
    public modalController: ModalController,
    public platform: Platform,
  ) {
    this.nodos = this.aa;
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {}
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // openModal()
  async openModal(nombreNodo: string, tipoNodo: string, usuarioNodo: string) {
    const modal = await this.modalController.create({
      component: EditarComponent,
      componentProps: {
        nombreNodo,
        tipoNodo,
        usuarioNodo
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

}
