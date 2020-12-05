import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  constructor() { }

  // tslint:disable-next-line:variable-name
  public show_1 = false;
  // tslint:disable-next-line:variable-name
  public show_2 = false;
  // tslint:disable-next-line:variable-name
  public show_3 = false;

  ngOnInit() {
  }

  // tslint:disable-next-line:variable-name
  showInfo(number) {
    switch (number) {
      case 1 : this.show_1 = true;
               break;
      case 2 : this.show_2 = true;
               break;
      case 3 : this.show_3 = true;
               break;
    }
  }
}
