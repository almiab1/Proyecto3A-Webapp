import {Component, Input, OnInit} from '@angular/core';
import {MenuController, ModalController, Platform} from '@ionic/angular';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() mode: string;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mapa',
      url: '/mapa',
      icon: 'locate'
    },
    {
      title: 'Rutas',
      url: '/rutas',
      icon: 'navigate'
    },
    {
      title: '+Info',
      url: '/mas-info',
      icon: 'information-circle-outline',
      subPages: [
        {
          title: 'Tips',
          icon: 'leaf',
          url: '/components/tips',
        },
        {
          title: 'Medidas oficiales',
          icon: 'information',
          url: '/mas-info'
        }
      ]
    },
    {
      title: 'Scaner',
      url: '/scaner',
      icon: 'camera'
    },
    {
      title: 'Configuración',
      url: '/config',
      icon: 'options'
    }
  ];
  constructor(private menuCtrl: MenuController,
              private modalCtrl: ModalController) { }

  ngOnInit() {}
  async loginModal() {
    await this.menuCtrl.close();
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      mode: 'ios',
      componentProps: {
        rolUser: 0,
        mode: this.mode
      }
    });
    await modal.present();
  }
}
