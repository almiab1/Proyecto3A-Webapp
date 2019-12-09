import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../../../../core/services/login.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss'],
})
export class CerrarSesionComponent implements OnInit {
  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {}
  logOut() {
    this.loginService.logout();
    this.router.navigate(['home']);
  }
}
