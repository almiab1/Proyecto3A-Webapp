import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;
  constructor() { }

  ngOnInit() {
  }

}
