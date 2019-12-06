import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tol-bar-admin',
  templateUrl: './tol-bar-admin.component.html',
  styleUrls: ['./tol-bar-admin.component.scss'],
})
export class TolBarAdminComponent implements OnInit {

  @Input() iconoAnyadir: string;
  @Input() placeHolder: string;
  @Input() funcionFiltrado: string;
  @Input() abrirModalAnyadir: string;

  constructor() { }

  ngOnInit() {}

}