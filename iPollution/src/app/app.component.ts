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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if (this.platform.is('mobile')) {
      this.appPages = [{
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Mapa',
          url: '/mapa',
          icon: 'map'
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
        }
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
          icon: 'map'
        },
        {
          title: '+Info',
          url: '/mas-info',
          icon: 'information-circle-outline'
        }
      ];
    }

  }
}
