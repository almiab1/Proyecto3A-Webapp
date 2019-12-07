import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss'],
})
export class AdminToolbarComponent implements OnInit {
  @Input() iconoAnyadir: string;
  @Input() placeHolder: string;
  @Input() funcionFiltrado: string;
  @Input() abrirModalAnyadir: string;

  constructor() { }

  ngOnInit() {}

}
