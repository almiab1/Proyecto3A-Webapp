import {Component, Input, OnInit} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {LoginComponent} from '../login/login.component';
import {LoginService} from '../../../core/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() mode: string;
  private rolUser: any;
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
      url: 'user/rutas',
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
          url: '/tips',
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
      url: '/escaner',
      icon: 'camera'
    },
    {
      title: 'Configuración',
      url: '/user/config',
      icon: 'options'
    },
    {
      title: 'Administración',
      url: '/admin',
      icon: 'folder',
      subPages: [{
        title: 'Usuarios',
        icon: 'people',
        url: '/admin/users'
      },
        {
          title: 'Nodos',
          icon: 'radio-button-on',
          url: '/admin/nodos'
        }]
    },
  ];
  constructor(private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              private loginService: LoginService) {
    this.rolUser = loginService.rolUser;
  }

  ngOnInit() {}
  async loginModal() {
    await this.menuCtrl.close();
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      mode: 'ios',
      componentProps: {
        mode: this.mode
      }
    });
    await modal.present();
    const dataModal = await modal.onDidDismiss();
    if (dataModal.data === undefined) {
      this.rolUser = 0;
      return;
    }
    this.rolUser = dataModal.data;
  }
}
