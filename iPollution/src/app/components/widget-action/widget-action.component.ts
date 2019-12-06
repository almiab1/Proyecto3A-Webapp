import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-widget-action',
  templateUrl: './widget-action.component.html',
  styleUrls: ['./widget-action.component.scss'],
})
export class WidgetActionComponent implements OnInit {
  @Input() titulo: string;
  @Input() descripcion: string;
  @Input() color: string;
  @Input() backgroundColor: string;
  @Input() icono: string;
  @Input() ruta: string[];
  constructor() { }
  ngOnInit() {}

}
