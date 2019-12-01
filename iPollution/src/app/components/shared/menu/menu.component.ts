import { Component, OnInit } from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
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
  loginModal() {

  }
}
