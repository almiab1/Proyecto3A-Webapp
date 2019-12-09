import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from '../../../core/services/login.service';
import {Platform} from '@ionic/angular';
import {DataService} from "../../../core/services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @Input() rolUser: number;
  tamanyoWidget: number;
  constructor(private loginService: LoginService,
              private platform: Platform,
              private data: DataService) {
    this.rolUser = data.rolUser;
    this.contarNumeroWidgets();
  }
  ngOnInit() {
    this.tamanyoWidget = this.contarNumeroWidgets();
  }
  contarNumeroWidgets(): number {
    let contador = 1;
    if (this.platform.is('mobile')) {
      contador++;
    }
    if (this.rolUser === 1 || this.rolUser === 2) {
      contador++;
    }
    return 12 / contador;
  }
}
