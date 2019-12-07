import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'config'},
  {path: 'config', loadChildren: './configuracion/configuracion.module#ConfiguracionPageModule'},
  {path: 'rutas', loadChildren: './rutas/rutas.module#RutasPageModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasureroRoutingModule { }
