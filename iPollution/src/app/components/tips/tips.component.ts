import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent implements OnInit {

  consejos: string[] = ['aaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbbbb'];

  constructor(private ngZone: NgZone) { }

  ngOnInit() {}

}
