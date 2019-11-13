import { UsersComponent } from './pages/admin/users/users.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then(m => m.MapaPageModule)
  },
  {
    path: 'mas-info',
    loadChildren: () => import('./pages/mas-info/mas-info.module').then(m => m.MasInfoPageModule)
  },
  {
    path: 'scaner',
    loadChildren: () => import('./pages/scaner/scaner.module').then(m => m.ScanerPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./pages/config/config.module').then(m => m.ConfigPageModule)
  },
  {
    path: 'rutas',
    loadChildren: () => import('./pages/rutas/rutas.module').then(m => m.RutasPageModule)
  },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule' },
  { path: 'admin/users', component: UsersComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
