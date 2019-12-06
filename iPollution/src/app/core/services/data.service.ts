import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  rolUser: number;
  constructor() { }
  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }
}
