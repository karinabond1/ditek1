import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() customers: object[];
  @Input() client: any;
  @Output() updateBalances = new EventEmitter<string>();
  @Output() addTransaction = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
