import { NgModule } from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './pages/ciudadano/home/home.module#HomePageModule'},
  {path: 'mapa', loadChildren: './pages/ciudadano/mapa/mapa.module#MapaPageModule'},
  {path: 'mas-info', loadChildren: './pages/ciudadano/mas-info/mas-info.module#MasInfoPageModule'},
  {path: 'tips', loadChildren: './pages/ciudadano/tips/tips.module#TipsPageModule'},
  {path: 'escaner', loadChildren: './pages/ciudadano/escaner/escaner.module#EscanerPageModule'},
  {path: 'user', loadChildren: './pages/basurero/basurero.module#BasureroModule'},
  {path: 'admin', loadChildren: './pages/administrador/administrador.module#AdministradorModule'},
  {path: '**', redirectTo: 'home'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
