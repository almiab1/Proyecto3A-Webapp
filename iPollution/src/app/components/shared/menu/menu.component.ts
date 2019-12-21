import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {LoginComponent} from '../login/login.component';
import {DataService} from '../../../core/services/data.service';
import {MenuItem} from '../../../models/MenuItem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  public menuPages: MenuItem[];
  @Input() rolUser: number;
  constructor(private menuCtrl: MenuController,
              private modalCtrl: ModalController,
              private data: DataService) { }

  ngOnInit()  {
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
    }
  }
  rellenarMenu() {
    this.data.getMenu().subscribe(data => {
      this.menuPages = data;
    }, err => {
      console.log(err);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rellenarMenu();
  }
}
