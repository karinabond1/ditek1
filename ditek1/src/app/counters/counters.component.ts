import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css']
})
export class CountersComponent implements OnInit {

  constructor() { }

  @Input() show1: boolean;
  @Input() show2: boolean;
  @Input() show3: boolean;

  ngOnInit() {
  }

  // tslint:disable-next-line:variable-name
  showInfo(number) {
    switch (number) {
      case 1 : this.show1 = true;
               break;
      case 2 : this.show2 = true;
               break;
      case 3 : this.show3 = true;
               break;
    }
  }
}
