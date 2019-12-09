import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss'],
})
export class AdminToolbarComponent implements OnInit {
  @Input() iconoAnyadir: any;
  @Input() placeHolder: string;
  @Input() funcionFiltrado: any;
  @Input() abrirModalAnyadir: any;

  constructor() { }

  ngOnInit() {}

}
