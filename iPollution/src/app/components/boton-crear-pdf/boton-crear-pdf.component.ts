import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-boton-crear-pdf',
  templateUrl: './boton-crear-pdf.component.html',
  styleUrls: ['./boton-crear-pdf.component.scss'],
})
export class BotonCrearPdfComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  

  ngOnInit() {}

}
