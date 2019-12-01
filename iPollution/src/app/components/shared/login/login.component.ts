import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  mode: any;
  loading: any;
  rolUser: number;
  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {}
  onSubmitTemplate() {
    this.presentarLoading();
  }
  closeModal() {
    this.modalCtrl.dismiss(this.rolUser);
  }
  async presentarLoading() {
    this.loading = await this.loadingCtrl.create({
      mode: this.mode
    });
    await this.loading.present();
  }

}
