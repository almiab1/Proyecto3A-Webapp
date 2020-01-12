import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MenuItem} from '../../models/MenuItem';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  platform: string;
  rolUser: number;
  idUser: string;
  bleActivado: boolean;
  constructor(private http: HttpClient) {
    this.idUser = null;
    this.bleActivado = false;
  }
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }
  getMenu(): Observable<MenuItem[]> {
    if ((this.platform === 'ios' || this.platform === 'md') && this.rolUser === 0) {
      return this.http.get<MenuItem[]>('/assets/data/menu/menu.user-mobile.json');
    }
    if (this.platform === 'desktop' && this.rolUser === 0) {
      return this.http.get<MenuItem[]>('/assets/data/menu/menu.user-desktop.json');
    }
    if ((this.platform === 'ios' || this.platform === 'md') && this.rolUser === 1) {
      return this.http.get<MenuItem[]>('/assets/data/menu/menu.basurero-mobile.json');
    }
    if (this.platform === 'desktop' && this.rolUser === 1) {
      return this.http.get<MenuItem[]>('/assets/data/menu/menu.basurero-desktop.json');
    }
    if ((this.platform === 'ios' || this.platform === 'md') && this.rolUser === 2) {
      return this.http.get<MenuItem[]>('/assets/data/menu/menu.admin-mobile.json');
    }
    if (this.platform === 'desktop' && this.rolUser === 2) {
      return this.http.get<MenuItem[]>('/assets/data/menu/menu.admin-desktop.json');
    }
  }
  borrarStorage() {
    this.rolUser = 0;
    localStorage.clear();
  }
}
