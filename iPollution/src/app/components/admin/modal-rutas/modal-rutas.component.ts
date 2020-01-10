import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams,
} from '@ionic/angular';

@Component({
  selector: 'app-modal-rutas',
  templateUrl: './modal-rutas.component.html',
  styleUrls: ['./modal-rutas.component.scss'],
})
export class ModalRutasComponent implements OnInit {

  tituloComponent: string;
  tipoModal: string;

  constructor(
    private navParams: NavParams,
  ) { }

  ngOnInit() {
    this.tituloComponent = this.navParams.data.titulo;
    this.tipoModal = this.navParams.data.tipoModal;
  }

}
