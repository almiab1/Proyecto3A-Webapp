import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginService} from '../../../core/services/login.service';
import {Platform} from '@ionic/angular';
import {DataService} from '../../../core/services/data.service';
import {ReceptorBLE} from '../../../core/services/ReceptorBle.service';
import {LogicaDeNegocioFake} from '../../../core/services/LogicaDeNegocioFake.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private loginService: LoginService,
              private platform: Platform,
              private ble: ReceptorBLE,
              private server: LogicaDeNegocioFake,
              private data: DataService) {
      setInterval( () => {
          if (!this.data.bleActivado) {
              this.inicializarBLE();
          }
          this.subirMedidas();
      }, 5000);
    }
  tamanyoWidget: number;

  ngOnInit() {
    this.tamanyoWidget = this.contarNumeroWidgets();
  }
  inicializarBLE() {
    if (this.platform.is('mobile')) {
      this.ble.inizializar();
    }
  }
  subirMedidas() {
    if (!this.platform.is('mobile')) { return; }
    const medicion = this.ble.obtenerO3();
    if (medicion.valorMedido === -1 || medicion.humedad === -1 || medicion.temperatura === -1) {
      console.log('medición errónea');
      return;
    } else if (this.data.bleActivado) {
        if (this.data.idUser !== null && this.data.rolUser === 1) {
            this.server.guardarMedida(medicion);
        }
    }
  }
  contarNumeroWidgets(): number {
    let contador = 1;
    if (this.platform.is('mobile')) {
      contador++;
    }
    if (this.data.rolUser === 1 || this.data.rolUser === 2) {
      contador++;
    }
    return 12 / contador;
  }
}
