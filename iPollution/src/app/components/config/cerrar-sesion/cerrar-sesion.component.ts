import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss'],
})
export class CerrarSesionComponent implements OnInit {

  @Input() funcionLogOut: any;
  constructor() { }

  ngOnInit() {}

}
