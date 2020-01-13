import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {LoginService} from './core/services/login.service';
import {DataService} from './core/services/data.service';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService: LoginService,
    private data: DataService,
  ) {
    this.comprobarPlataforma();
    this.loginService.comprobarLogin();
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  comprobarPlataforma() {
    if (this.platform.is('ios')) { this.data.platform = 'ios'; }
    if (this.platform.is('android')) { this.data.platform = 'md'; }
    if (this.platform.is('desktop')) { this.data.platform = 'desktop'; }
  }
}
