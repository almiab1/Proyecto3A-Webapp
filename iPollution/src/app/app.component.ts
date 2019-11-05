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
  Platform
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
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
        { title: 'Admin', url: '/admin/users'},
        {
          title: 'Mapa',
          url: '/mapa',
          icon: 'locate'
        },
        {
          title: '+Info',
          url: '/mas-info',
          icon: 'information-circle-outline'
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
        { title: 'Admin', url: '/admin/users'},
        {
          title: 'Mapa',
          url: '/mapa',
          icon: 'locate'
        },
        {
          title: '+Info',
          url: '/mas-info',
          icon: 'information-circle-outline'
        },
        {
          title: 'Rutas',
          url: '/rutas',
          icon: 'navigate'
        },
        {
          title: 'Configuración',
          url: '/config',
          icon: 'cog'
        },
      ];
    }

  }
}