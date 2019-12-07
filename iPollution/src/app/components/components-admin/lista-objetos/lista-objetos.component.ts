import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lista-objetos',
  templateUrl: './lista-objetos.component.html',
  styleUrls: ['./lista-objetos.component.scss'],
})
export class ListaObjetosComponent implements OnInit {

  @Input() objects: any;
  @Input() abrirModal: string;
  @Input() tituloLista: string;
  @Input() nombreObjecto: string;

  constructor() { }

  ngOnInit() {}

}
