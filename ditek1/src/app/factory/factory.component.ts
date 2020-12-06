import {Component,  Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {
  @Input() tx: object[];
  @Input() factory: object[];

  constructor() {
  }

  ngOnInit() {
  }
}
