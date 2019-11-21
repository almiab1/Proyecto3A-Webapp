/* @author: Oscar Blanquez
 * @description: Servicio de angular para hacer login
 * Sprint 2
 */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private reqHeader: HttpHeaders;
  private url = 'https://osblasae.upv.edu.es';
  constructor(private httpClient: HttpClient) { }
  /* ********* autenticarUsuario()  ***************
  *  Oscar Blanquez
  *  description: peticion POST al servidor con el
  *  email y la contraseña para logear al usuario.
  *  @params: usuario: string, password: string
  *  @return: Observable: any
  *  */
  autenticarUsuario(username, password): Observable<any> {
    const body = new HttpParams()
        .set('idUsuario', username)
        .set('contrasenya', password);
    return this.httpClient.post(`${this.url}/login`, body);
  }
}
