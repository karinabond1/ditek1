import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {
  @Input() transactions: object[];

  constructor() {
  }

  ngOnInit() {
  }
}
