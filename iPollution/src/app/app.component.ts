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
  Component, OnInit
} from '@angular/core';
import {
  MenuController,
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
import * as  jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
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
  public rolUser: number;
  // ----------------------------
  // Constructor()
  // ----------------------------
  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalController: ModalController,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }
  // ----------------------------
  // initializeApp()
  // ----------------------------
  initializeApp() {

    // Nada mas iniciar el componente, revisamos
    // si el usuario ya tiene el token
    const token = localStorage.getItem('token');
    if (token == null) {
      this.rolUser = 0;
    } else {
      this.rolUser = jwt_decode(token).idTipoUsuario;
    }
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
          title: 'Rutas',
          url: '/rutas',
          icon: 'navigate'
        },
        {
          title: '+Info',
          url: '/mas-info',
          icon: 'information-circle-outline',
          subPages: [{
            title: 'Tips',
            icon: 'leaf',
            url: '/components/tips'
          },
          {
            title: 'Medidas Oficiales',
            icon: 'information',
            url: '/mas-info'
          }
        ]
        },
        {
          title: 'Scaner',
          url: '/scaner',
          icon: 'camera'
        }
        // {
        //   title: 'Configuración',
        //   url: '/config',
        //   icon: 'options'
        // },
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
            icon: 'leaf',
            url: '/components/tips'
          },
          {
            title: 'Medidas Oficiales',
            icon: 'information',
            url: '/mas-info'
          }
        ]
        },
        {
          title: 'Rutas',
          url: '/rutas',
          icon: 'navigate'
        },
        {
          title: 'Administración',
          url: '/admin',
          icon: 'folder',
          subPages: [{
              title: 'Usuarios',
              icon: 'people',
              url: '/components/usuarios'
            },
            {
              title: 'Nodos',
              icon: 'radio-button-on',
              url: '/components/nodos'
            }
          ]
        },
        // {
        //   title: 'Configuración',
        //   url: '/config',
        //   icon: 'options'
        // },
      ];
    }
    if (this.rolUser === 1 || this.rolUser === 2) {
      this.appPages.push(
          {
            title: 'Rutas',
            url: '/rutas',
            icon: 'navigate'
          },
          {
            title: 'Configuracion',
            url: '/config',
            icon: 'settings'
          });
    }
    if (this.rolUser === 2) {
      this.appPages.push(
          {
            title: 'Administración',
            url: '/admin',
            icon: 'folder',
            subPages: [{
              title: 'Usuarios',
              icon: 'people',
              url: '/components/usuarios'
            },
              {
                title: 'Nodos',
                icon: 'radio-button-on',
                url: '/components/nodos'
              }
            ]
          }
      );
    }
  }
  loginModal = async ()  => {
    this.menuCtrl.close();
    const modal = await this.modalController.create({
      component: LoginPage,
      mode: 'ios',
      componentProps: {
        rolUser: 0
      }
    });
    modal.onDidDismiss()
        .then( (data => {
          if (data.data === undefined) {
            this.rolUser = 0;
            return;
          }
          this.rolUser = data.data;
          console.log("CAMBIAR RUTA");
          this.router.navigate(['/home']);
        }));
    modal.present();
  }
}
