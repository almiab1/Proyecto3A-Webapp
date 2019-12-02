import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../core/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  rolUser: number;
  constructor(private loginService: LoginService) {
    this.rolUser = loginService.rolUser;
  }

  ngOnInit() {
  }

}
