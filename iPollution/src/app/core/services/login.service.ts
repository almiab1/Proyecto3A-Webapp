import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as  jwt_decode from 'jwt-decode';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'https://osblasae.upv.edu.es';
  constructor(private httpClient: HttpClient,
              private data: DataService) { }
  /* ********* autenticarUsuario()  ***************
  *  Oscar Blanquez
  *  description: peticion POST al servidor con el
  *  email y la contraseña para logear al usuario.
  *  @params: usuario: string, password: string
  *  @return: Token / Error
  *  */
  autenticarUsuario(username, password): Observable<any> {
    const body = new HttpParams()
        .set('idUsuario', username)
        .set('contrasenya', password);
    return this.httpClient.post(`${this.url}/login`, body);
  }
  comprobarLogin() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.data.rolUser = 0;
      return;
    }
    this.data.rolUser = jwt_decode(token).idTipoUsuario;
  }
  procesarToken(token) {
    this.data.guardarToken(token);
    return this.data.rolUser = jwt_decode(token).idTipoUsuario;
  }
  logout() {
    this.data.borrarStorage();
  }
}
