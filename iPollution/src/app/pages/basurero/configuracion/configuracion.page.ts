// -----------------------------------------------------------------------
// config.page.ts
// Controlador vista configuracion
// Equipo 4
// Alejandro Mira Abad y Oscar Blanquez
// Fecha
// CopyRight
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// Includes
// -----------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../../../core/services/data.service';
// -----------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
// -----------------------------------------------------------------------
// Clase ConfiguracionPage
// -----------------------------------------------------------------------
export class ConfiguracionPage implements OnInit {

  // -----------------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------------
  constructor(
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {}
}
