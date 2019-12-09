import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {LoginComponent} from '../login/login.component';
import {LoginService} from '../../../core/services/login.service';
import {DataService} from '../../../core/services/data.service';
import {MenuItem} from '../../../models/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menuPages: MenuItem[];
  constructor(private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              public data: DataService) { }

  ngOnInit() {
    this.rellenarMenu();
  }
  async loginModal() {
    await this.menuCtrl.close();
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      mode: 'ios'
    });
    await modal.present();
    const dataModal = await modal.onDidDismiss();
    if (dataModal.data === undefined) {
      this.data.rolUser = 0;
      return;
      this.rellenarMenu();
    }
    this.rellenarMenu();
  }
  rellenarMenu() {
    this.data.getMenu().subscribe(data => {
      this.menuPages = data;
    }, err => {
      console.log(err);
    });
  }
}
