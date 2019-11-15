import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { LogicaDeNegocioFake } from './../../../core/services/LogicaDeNegocioFake.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(
    server = LogicaDeNegocioFake) {

     }

  ngOnInit() {

  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      const datos = [
        'Alex',
        'Pepe',
        'Juan'
    ];
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // tslint:disable-next-line: triple-equals
      if (datos.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}
