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
import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
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
  modalTitle: string;
  tipoNodo: number;
  usuarioNodo: string;

  // ----------------------------------------------------------------------------
  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {
    console.table(this.navParams);
    // tslint:disable-next-line: radix
    this.tipoNodo = parseInt(this.navParams.data.tipoNodo);
    this.modalTitle = this.navParams.data.nombreNodo;
    this.usuarioNodo = this.navParams.data.usuarioNodo;
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // closeModal()
  async closeModal() {
    const onClosedData = 'ModalCerrado';
    await this.modalController.dismiss(onClosedData);
  }
  // ----------------------------------------------------------------------------

}

