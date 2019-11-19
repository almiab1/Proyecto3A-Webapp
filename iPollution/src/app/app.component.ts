// ----------------------------
// app.component.ts
// Controlador vistas app y menu
// Equipo 4
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  Component
} from '@angular/core';
import {
  ModalController,
  Platform
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
import {LoginPage} from './pages/login/login.page';
// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
// ----------------------------
// Class AppComponent
// ----------------------------
export class AppComponent {

  public appPages: any;
  // ----------------------------
  // Constructor()
  // ----------------------------
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController
  ) {
    this.initializeApp();
  }
  // ----------------------------
  // initializeApp()
  // ----------------------------
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    // ----------------------------
    // elementos menu
    // ----------------------------
    if (this.platform.is('mobile')) {
      this.appPages = [{
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
          title: '+Info',
          url: '/mas-info',
          icon: 'information-circle-outline',
          subPages: [{
            title: 'Tips',
            icon: 'add',
            url: '/components/nodos'
          },
          {
            title: 'Medidas Oficiales',
            icon: 'add',
            url: '/components/usuarios'
          }
        ]
        },
        {
          title: 'Scaner',
          url: '/scaner',
          icon: 'camera'
        },
        {
          title: 'Rutas',
          url: '/rutas',
          icon: 'navigate'
        },
        {
          title: 'Adinistración',
          url: '/admin',
          icon: 'cog',
          subPages: [{
              title: 'Usuarios',
              icon: 'add',
              url: '/components/usuarios'
            },
            {
              title: 'Nodos',
              icon: 'add',
              url: '/components/nodos'
            }
          ]
        },
        {
          title: 'Configuración',
          url: '/config',
          icon: 'cog'
        },
      ];
    } else {
      this.appPages = [{
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
          title: '+Info',
          url: '/mas-info',
          icon: 'information-circle-outline',
          subPages: [{
            title: 'Tips',
            icon: 'add',
            url: '/components/usuarios'
          },
          {
            title: 'Medidas Oficiales',
            icon: 'add',
            url: '/components/nodos'
          }
        ]
        },
        {
          title: 'Rutas',
          url: '/rutas',
          icon: 'navigate'
        },
        {
          title: 'Adinistración',
          url: '/admin',
          icon: 'cog',
          subPages: [{
              title: 'Usuarios',
              icon: 'add',
              url: '/components/usuarios'
            },
            {
              title: 'Nodos',
              icon: 'add',
              url: '/components/nodos'
            }
          ]
        },
        {
          title: 'Configuración',
          url: '/config',
          icon: 'cog'
        },
      ];
    }

  }
  loginModal = async ()  => {
    const modal = await this.modalController.create({
      component: LoginPage
    });
    modal.present();
  }
}
