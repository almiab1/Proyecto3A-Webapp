import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersPage} from './users/users.page';


const routes: Routes = [
  {path: '', redirectTo: 'users'},
  {path: 'users', loadChildren: './users/users.module#UsersPageModule'},
  {path: 'nodos', loadChildren: './nodos/nodos.module#NodosPageModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
