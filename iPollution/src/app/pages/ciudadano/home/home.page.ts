import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../core/services/login.service';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rolUser: number;
  constructor(private loginService: LoginService,
              private platform: Platform) {
    // this.rolUser = loginService.rolUser;
    this.rolUser = 0;
    this.contarNumeroWidgets();
  }
  ngOnInit() {
  }
  contarNumeroWidgets() {
    let contador = 0;
    if (this.platform.is('mobile')) {
      contador++;
    }
    if (this.rolUser === 1 || this.rolUser === 2) {
      contador++;
    }
  }
}
