// -----------------------------------------------------------------------
// config.page.ts
// Controlador vista configuracion
// Equipo 4
// Alejandro Mira Abad y Oscar Blazquez
// Fecha
// CopyRight
// -----------------------------------------------------------------------

// -----------------------------------------------------------------------
// Includes
// -----------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit() {}

  logout = () => {
    localStorage.removeItem('token');
    this.router.navigate(['/config']);
  }

}
