import { Component, OnInit, Input } from '@angular/core';
import {LoginService} from "../../../core/services/login.service";
import {Router} from "@angular/router";

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
