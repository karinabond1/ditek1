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

  public ee1 = 0;
  public ee2 = 0;
  public ee3 = 0;
  public co1 = 0;
  public co2 = 0;
  public co3 = 0;
  public gen11 = 0;
  public gen12 = 0;
  public gen13 = 0;
  public gen21 = 0;
  public gen22 = 0;
  public gen23 = 0;

  ngOnInit() {
  }

  // tslint:disable-next-line:variable-name
  showInfo(number) {
    switch (number) {
      case 1 : this.ee1 = Math.floor(Math.random() * 100);
               this.co1 = Math.floor(Math.random() * 100);
               this.gen11 = Math.floor(Math.random() * 100);
               this.gen21 = Math.floor(Math.random() * 100);
               break;
      case 2 : this.ee2 = Math.floor(Math.random() * 100);
               this.co2 = Math.floor(Math.random() * 100);
               this.gen12 = Math.floor(Math.random() * 100);
               this.gen22 = Math.floor(Math.random() * 100);
               break;
      case 3 : this.ee3 = Math.floor(Math.random() * 100);
               this.co3 = Math.floor(Math.random() * 100);
               this.gen13 = Math.floor(Math.random() * 100);
               this.gen23 = Math.floor(Math.random() * 100);
               break;
    }
  }
}
